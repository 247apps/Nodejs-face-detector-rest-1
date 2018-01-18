/*
 * failed
 * node detector/test_blur7_canvas_graphics_wrapper.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * http://localhost:8081
 * API: http://localhost:8081/blurring-service/test-blur POST image=urlencode of base64string to this API

 */

'use strict';

var Graphics = require('node-canvas-graphics-wrapper')
 
// var canvas = $('#mycanvas')[0]                 // getting the canvas with jquery 
var canvas = document.getElementById('mycanvas')  // or with document.getElementById() 
 
var viewport = { width: 1920, height: 1080 }
var g = Graphics.createFromCanvas(canvas, viewport)
 
g.setColor('#FF0000')
g.drawLine(100, 100, 200, 200)
 
g.setColor('#000000')
g.drawRect(100, 100, 50, 50)
g.setColor('#00FF00')
g.fillCircle(300, 300, 50)
