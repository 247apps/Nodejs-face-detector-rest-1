/*
 * node detector/app.js
 * POST to this API via URL /detector/face_detector
 * @param: image=base64string
 * add blurry block on face on the photo and return base64 to json response
 * Version 2.0.0
 */

'use strict';
var express = require('express');
var router = express.Router();
const Clarifai = require('clarifai');
require('dotenv').config();//bring in env vars
var fs = require("fs");
  
// initialize clarifai with api key in ENV vars .env in the root dir
const appCL = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});


//POST
router.post('/', function(req, res) {

    var image       = req.body.image.toString('base64');

    var count_faces = 0;
    var responseObject;
    var CLstatus;
    var newBase64;

    //appCL.models.predict(Clarifai.FACE_DETECT_MODEL, image).then( //success: accept URL only
    appCL.models.predict(Clarifai.FACE_DETECT_MODEL, {base64: image} ).then( //success: urlencode of base64string
            
        function(response) {
            //success call
            
            var arr
            arr = response.outputs
            
            var CLdata = arr[0]["data"]
            CLstatus = arr[0]["status"]
            
            if( CLdata != '' ){
                var CLfaces = CLdata.regions
                count_faces = CLfaces.length
            }
           
            console.log(CLfaces) //test
            
            //todo: use var CLfaces to blur a face and return newBase64
            //newBase64
            

            responseObject = { "status": CLstatus, "faces": count_faces, "data": CLdata, "new_base64": newBase64 }

            res.send(responseObject)
          
        },

        function(err) {
          //error
           // console.log('failed')
          
          CLstatus = err.data.status
          
          responseObject = { status: CLstatus }
          res.status(400).send(responseObject)
        }
        
);
    
});

module.exports = router;
