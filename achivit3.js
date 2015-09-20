/*
console.log(new Buffer('bytewiser'));

var bytes = process.argv.slice(2).map(Number)
console.log(new Buffer(bytes).toString('hex'))


var DOT = '.'.charCodeAt(0), BANG = '!'.charCodeAt(0)
process.stdin.on('data', function(buff) {
  for (var i = 0; i < buff.length; i++) {
    if (buff[i] === DOT) buff[i] = BANG
  }
  console.log(buff);
});


var fs = require('fs')
var file = fs.readFileSync(process.argv[2])
var offset = 0, NL = '\n'.charCodeAt(0)

for (var i = 0; i < file.length; i++) {
  if (file[i] === NL) {
    console.log(file.slice(offset, i))
    i++
    offset = i
  }
}
console.log(file.slice(offset, i))


var buffers = [];

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    buffers.push(chunk);
  }
});

process.stdin.on('end', function() {
  console.log(Buffer.concat(buffers));
});


process.stdin.once('data', function(buff) {
  var ui8 = new Uint8Array(buff)
  console.log(JSON.stringify(ui8))
})
*/

var num = Number(process.argv[2])
var ui32 = new Uint32Array(1)
ui32[0] = num
var ui16 = new Uint16Array(ui32.buffer)
console.log(JSON.stringify(ui16))


