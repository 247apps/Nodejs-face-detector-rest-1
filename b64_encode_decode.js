//node blurring/b64_encode_decode.js

var base64 = require('base64-coder-node')();


var t = base64.decode('data:image/png;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7');

console.log(t)
//console.log(t.toString()); //not work
//console.log(t.toString('ascii')); //notwork
//console.log(t.toString('hex')); //notwork


//console.log(t);
//console.log(imgWidth);
 
//console.log(base64.encode('Base64 string encoder/decoder.', 'utf16le'));
//console.log(base64.decode('QgBhAHMAZQA2ADQAIABzAHQAcgBpAG4AZwAgAGUAbgBjAG8AZABlAHIALwBkAGUAYwBvAGQAZQByAC4A', 'utf16le'));
