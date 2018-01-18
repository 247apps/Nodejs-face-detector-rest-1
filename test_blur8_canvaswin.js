/*
 * failed-require canvas
 * node blurring/test_blur8_canvaswin.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * http://localhost:8081
 * API: http://localhost:8081/blurring-service/test-blur POST image=urlencode of base64string to this API

 */

'use strict';

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

ctx.saveToFile('./img/_wos2.png', 'image/png');
