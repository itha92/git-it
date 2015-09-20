/*console.log('beep boop')


var fs = require('fs');
var file = process.argv[2];
fs.createReadStream(file).pipe(process.stdout);

process.stdin.pipe(process.stdout);

 var through = require('through2');
  var tr = through(function (buf, _, next) {
      this.push(buf.toString().toUpperCase());
      next();
  });
  process.stdin.pipe(tr).pipe(process.stdout);
  
  
var through = require('through2');
var split = require('split');

var lineCount = 0;
var tr = through(function (buf, _, next) {
    var line = buf.toString();
    this.push(lineCount % 2 === 0
        ? line.toLowerCase() + '\n'
        : line.toUpperCase() + '\n'
    );
    lineCount ++;
    next();
});
process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout);
  

var concat = require('concat-stream');
  
process.stdin.pipe(concat(function (src) {
  var s = src.toString().split('').reverse().join('');
  console.log(s);
}));

var http = require('http');
  var through = require('through2');
  
  var server = http.createServer(function (req, res) {
      if (req.method === 'POST') {
          req.pipe(through(function (buf, _, next) {
              this.push(buf.toString().toUpperCase());
              next();
          })).pipe(res);
      }
      else res.end('send me a POST\n');
  });
  server.listen(parseInt(process.argv[2]));


var request = require('request');
var r = request.post('http://localhost:8099');
process.stdin.pipe(r).pipe(process.stdout);



var ws = require('websocket-stream');
  var stream = ws('ws://localhost:8099');
  stream.write('hello\n');


var trumpet = require('trumpet');
  var through = require('through2');
  var tr = trumpet();
  
  var loud = tr.select('.loud').createStream();
  loud.pipe(through(function (buf, _, next) {
      this.push(buf.toString().toUpperCase());
      next();
  })).pipe(loud);
  
  process.stdin.pipe(tr).pipe(process.stdout);


var spawn = require('child_process').spawn;
  var duplexer = require('duplexer2');
  
  module.exports = function (cmd, args) {
      var ps = spawn(cmd, args);
      return duplexer(ps.stdin, ps.stdout);
  };


var duplexer = require('duplexer2');
  var through = require('through2').obj;
  
  module.exports = function (counter) {
      var counts = {};
      var input = through(write, end);
      return duplexer(input, counter);
      
      function write (row, _, next) {
          counts[row.country] = (counts[row.country] || 0) + 1;
          next();
      }
      function end (done) {
          counter.setCounts(counts);
          done();
      }
  };
  
  
  var combine = require('stream-combiner');
  var through = require('through2');
  var split = require('split');
  var zlib = require('zlib');

  module.exports = function () {
      var grouper = through(write, end);
      var current;
      
      function write (line, _, next) {
          if (line.length === 0) return next();
          var row = JSON.parse(line);
          
          if (row.type === 'genre') {
              if (current) {
                  this.push(JSON.stringify(current) + '\n');
              }
              current = { name: row.name, books: [] };
          }
          else if (row.type === 'book') {
              current.books.push(row.name);
          }
          next();
      }
      function end (next) {
          if (current) {
              this.push(JSON.stringify(current) + '\n');
          }
          next();
      }
      
      return combine(split(), grouper, zlib.createGzip());
  };
  

  
  var crypto = require('crypto');
  process.stdin
      .pipe(crypto.createDecipher('aes256', process.argv[2]))
      .pipe(process.stdout);
  
  */
  
  
   var crypto = require('crypto');
  var tar = require('tar');
  var zlib = require('zlib');
  var concat = require('concat-stream');

  var parser = tar.Parse();
  parser.on('entry', function (e) {
      if (e.type !== 'File') return;
      
      var h = crypto.createHash('md5', { encoding: 'hex' });
      e.pipe(h).pipe(concat(function (hash) {
          console.log(hash + ' ' + e.path);
      }));
  });

  var cipher = process.argv[2];
  var pw = process.argv[3];
  process.stdin
      .pipe(crypto.createDecipher(cipher, pw))
      .pipe(zlib.createGunzip())
      .pipe(parser);