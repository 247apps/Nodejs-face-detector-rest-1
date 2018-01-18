/*
 * node detector/test_blur.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * http://localhost:8081
 * API: http://localhost:8081/blurring/test-blur POST image=urlencode of base64string to this API

 */

'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const Clarifai = require('clarifai');

var index = require('./routes/index');
var blurring = require('./routes/blurring');
var PImage = require('pureimage'); //test
var fs = require('fs');
var base64 = require('node-base64-image'); // ES5
var atob = require('atob');

const PIImage = require('purified-image'); //test

var app = express();
const PORT = process.env.PORT || 8080

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);



/* works
var sizeOf = require('image-size');
var dimensions = sizeOf('./blurring/img/sample_home_2face.png');
console.log(dimensions.width, dimensions.height);
*/



//test
//ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var image = new Image(60, 45);   // using optional size for image
image.onload = drawImageActualSize; // draw when image has loaded

// load an image of intrinsic size 300x227 in CSS pixels
image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

function drawImageActualSize() {
  // use the intrinsic size of image in CSS pixels for the canvas element
  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;

  // will draw the image as 300x227 ignoring the custom size of 60x45
  // given in the constructor
  ctx.drawImage(this, 0, 0);

  // To use the custom size we'll have to specify the scale parameters 
  // using the element's width and height properties - lets draw one 
  // on top in the corner:
  ctx.drawImage(this, 0, 0, this.width, this.height);
  
  ctx.drawImage(image, 53, 71, 104, 124, 21, 20, 87, 104);
ctx.fillStyle = 'rgba(255,51,51, 0.5)'; //opacity #333
ctx.fillRect(20,50,50,50);

}




app.listen(PORT, function () {
  console.log('http://localhost:', PORT)
})

module.exports = app;

