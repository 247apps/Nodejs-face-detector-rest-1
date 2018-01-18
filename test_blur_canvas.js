/*
 * //NOTWORK, require cairo, lib 2d dependencies on windows
 * 
 * 
 * 
 * node detector/test_blur.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/xxxxxxxxxxxxxxxx/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
 * http://localhost:8081
 * API: http://localhost:8081/blurring-service/test-blur POST image=urlencode of base64string to this API

 */

'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const Clarifai = require('clarifai');

var index = require('./routes/index');
var blurring = require('./routes/blurring');
//var PImage = require('pureimage'); //test
var fs = require('fs');
//const PIImage = require('purified-image'); //test

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




const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

//ctx.fillStyle = 'rgba(51,51,51, 0.5)'; //opacity #333
//ctx.fillRect(0,0,50,50);

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('./blurring-service/img/sample_home_2faceOut.png').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)

  console.log('<img src="' + canvas.toDataURL() + '" />')
})




app.listen(PORT, function () {
  console.log('http://localhost:', PORT)
})

module.exports = app;

