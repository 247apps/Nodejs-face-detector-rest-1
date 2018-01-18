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

/*
var b64_file =fs.readFile('./blurring/samples/base64_home_2face.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
*/


fs.readFile('./blurring/samples/base64_home_2face.txt', function(err, data) {
    var base64data = new Buffer(data).toString('base64');
    //console.log(base64data) //test
   
    var b64 = base64data //"SGVsbG8gV29ybGQ=" //b64_file //
    var bin = atob(b64);

    //console.log(bin) //test

//write to file 64txt works
    fs.writeFile("./blurring/img/_wow.txt", bin, function(err) {
        if(err) {
            return console.log(err);
        }
          console.log("The file was saved!");
       }); 
   
});

///process.exit()


   



//test7

//let url = './blurring-service/img/sample_home_2face.png'; // eslint-disable-line
//      let options = {string: true};
//
//      base64.encode(url, options, (err, image) => {
//        should.not.exist(err);
//
//        image.should.exist;
//        image.should.match(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
//        
//        console.log(image) //test
//        
//        done(); 
//});





/* test6, work, don't add exit()
    var img = PImage.make(200,200); //not url & base64???
    
    var ctx = img.getContext('2d');
    //ctx.fillStyle = '#00ff00';
    
    ctx.fillStyle = 'rgba(51,51,51, 0.5)'; //opacity #333
    ctx.fillRect(0,0,50,50);


    //ctx.closePath();
    
    
    PImage.encodeJPEGToStream(img, fs.createWriteStream('./blurring/img/out8.jpg')).then(()=> { //encodePNGToStream
        console.log("wrote out the png file to out.jpg");
    }).catch((e)=>{
        console.log("there was an error writing");
});

//BAD -process.exit()  //test,don't put here, it won't create image
//*/





//test5, notwork with js func
//var img = new PImage2;
//img.src = "./blurring/img/sample_home_2face.png";
//
//var timer = setInterval(function () { MyTimer() }, 200);
//function MyTimer() {
//    var ctx = canvas.getContext('2d');
//    ctx.drawImage(img, 0, 0,500,675);
//    img = new PImage2;
//    img.src = "./blurring/img/sample_home_2faceOut.png";
//}
//end test5







app.listen(PORT, function () {
  console.log('http://localhost:', PORT)
})

module.exports = app;

