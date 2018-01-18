/*
 * node blurring/test_vibrant_color.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxx
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


// ES5 
var Vibrant = require('node-vibrant')
// ES6 
//import * as Vibrant from 'node-vibrant'
// TypeScript 
//import Vibrant = require('node-vibrant')
 
// Using builder 
Vibrant.from('./blurring/img/sample_home_2face.png').getPalette((err, palette) => console.log(palette))

// Promise 
//Vibrant.from('path/to/image').getPalette()
//  .then((palette) => console.log(palette))
 
// Using constructor 
//let v = new Vibrant('./blurring/img/sample_home_2face.png', opts)
//v.getPalette((err, palette) => console.log(palette))
//// Promise 
//v.getPalette().then((palette) => console.log(palette))




app.listen(PORT, function () {
  console.log('http://localhost:', PORT)
})

module.exports = app;

