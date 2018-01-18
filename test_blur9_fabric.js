/*
 * failed-require canvas
 * node blurring/test_blur9_fabric.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * http://localhost:8081
 * API: http://localhost:8081/blurring-service/test-blur POST image=urlencode of base64string to this API

 */

'use strict';
const uniqueString = require('unique-string');


var filename = uniqueString()
//console.log(filename) //test

    var fs = require('fs'),
    fabric = require('fabric').fabric,
    out = fs.createWriteStream('./img/'+filename+'.png');
    
    
    //out = fs.createWriteStream(__dirname + '/helloworld.png');
    
    

/*
var canvas = fabric.createCanvasForNode(200, 200);
var text = new fabric.Text('Hello world', {
  left: 100,
  top: 100,
  fill: '#f55',
  angle: 15
});
canvas.add(text);

var stream = canvas.createPNGStream();
stream.on('data', function(chunk) {
  out.write(chunk);
});
*/


/*
require('canvas')
  var canvas = new Canvas();
  canvas.width = 200;
  canvas.height = 200;
  var ctx = canvas.getContext('2d');

ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);

var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();

ctx.saveToFile('./img/_wow2.png', 'image/png');
*/
