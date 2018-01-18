/*
 * node detector/test_blur.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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
var PImage = require('pureimage'); //test
var fs = require('fs');

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



//test
var img = PImage.make(100,100);
    var ctx = img.getContext('2d');
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(50,50,40,0,Math.PI*2,true); // Outer circle
    ctx.closePath();
    ctx.fill();
    
    PImage.encodePNGToStream(img1, fs.createWriteStream('./blurring-service/img/out.png')).then(()=> {
    console.log("wrote out the png file to out.png");
}).catch((e)=>{
    console.log("there was an error writing");
});
process.exit()  //test



//PImage.decodeJPEGFromStream(fs.createReadStream("./blurring-service/img/sample_home_2face.png")).then((img)=>{
PImage.decodePNGFromStream(fs.createReadStream("./blurring-service/img/sample_home_2face.png")).then((img)=>{
    console.log("size is",img.width,img.height);
    
    var img2 = PImage.make(50,50);
    var c = img2.getContext('2d');
    c.drawImage(img,
        0, 0, img.width, img.height, // source dimensions
        0, 0, 50, 50   // destination dimensions
    );
    var pth = path.join(BUILD_DIR,"resized_bird.jpg");
    PImage.encodeJPEGToStream(img2,fs.createWriteStream(pth)).then(()=> {
        console.log("done writing");
    });
//end test

process.exit()  //test


/* nothelp: test purified-image
let pi_image = new PIImage('./blurring-service/img/sample_home_2face.png');
pi_image
  .loadFont('/res/OpenSans.ttf')
  .draw(ctx => {
    ctx.fillStyle = '#000000';
    ctx.setFont('Open Sans', 20);
    ctx.fillText('example', 30, 30);
    
//    ctx.fillStyle = 'rgba(51,51,51, 0.5)'; //opacity #333
//    ctx.fillRect(0,0,20,20);
    
  })
  .save('./detector/img/_wow.png')
  .then(() => console.log('saved'));
//end test
*/






//test pureimage -not help

//var img1 = PImage.make(100,100);
//var ctx = img1.getContext('2d');
//ctx.fillStyle = 'rgba(255,0,0, 0.5)';
//ctx.fillRect(0,0,100,100);

    var img = PImage.make(100,100);    
    var ctx = img.getContext('2d');
    ctx.fillStyle = 'rgba(51,51,51, 0.5)'; //opacity #333, '#00ff00'; //solid green
    ctx.fillRect(0,0,100,100);
    ctx.beginPath();
    ctx.arc(50,50,40,0,Math.PI*2,true); // Outer circle
    ctx.closePath();
    ctx.fill();
    
//    PImage.encodeJPEGToStream(img2,fs.createWriteStream(pth)).then(()=> {
//        console.log("done writing");
//    });
    
    //output to out.png physical file
    PImage.encodePNGToStream(img, fs.createWriteStream('./blurring-service/img/_wow.png')).then(()=> {
        console.log("wrote out the png file to _wow.jpg");
    }).catch((e)=>{
        console.log("there was an error writing");
    });
    
    
//    PImage.encodePNG(img, fs.createWriteStream('./blurring-service/img/_out.png'), function(err) {
//        console.log("wrote out the png file to out.png");
//    });

//end test
//*/



process.exit()  //test


var count_faces = 2; //exists
var CLfaces = [{
			"id": "cwr6uiuco42d",
			"region_info": {
				"bounding_box": {
					"top_row": 0.43710598,
					"left_col": 0.7332351,
					"bottom_row": 0.6192386,
					"right_col": 0.8545874
				}
			}
		}, {
			"id": "w3dg51xflpog",
			"region_info": {
				"bounding_box": {
					"top_row": 0.18810849,
					"left_col": 0.8596386,
					"bottom_row": 0.38669994,
					"right_col": 0.9917106
				}
			}
		}];
        
        //foreach()
        for(var i = 0; i < count_faces; i++){
            var region = CLfaces[i]["region_info"].bounding_box //good
            //console.log(CLfaces[1]["id"]) //test
            console.log(region) //test
            
            //todo: start drawing a blurry block on original base64
            
        }
        
        
        
        
var image = ''; //todo

app.listen(PORT, function () {
  console.log('Face Detector API is listening on http://localhost:', PORT)
})

module.exports = app;
