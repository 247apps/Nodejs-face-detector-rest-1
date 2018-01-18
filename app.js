/*
 * node blurring/app.js
 * Required in .env in Root:
 * CLARIFAI_API_URL=https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs
 * CLARIFAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * http://localhost:8081
 * API: http://localhost:8081/blurring/blurring POST image=urlencode of base64string to this API
 * required: https://clarifai.com account
 */

'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const Clarifai = require('clarifai');

var index = require('./routes/index');
var blurring = require('./routes/blurring');
var nJwt = require('jwt-node')
var jwtRsa = require('./jwt-rsa')
require('dotenv').config();  //bring in .env vars

//ascii data back to binary. atob


var app = express();
const PORT = process.env.PORT || 8080

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// This middleware will parse a token and set these variables if successful
// res.locals.authorized = res.locals.jwt_authorized = true
// res.locals.verifiedJwt = verifiedJwt
// res.locals.userId = verifiedJwt.body.sub
//app.use(jwtRsa.btJwtMiddleware)

// This middleware makes sure that (res.locals.jwt_authorized === true)
// If not then returns unauthorized
//app.use(jwtRsa.requireJwtToken)

app.use('/blurring/blurring', blurring);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, function () {
  console.log('Face Detector API is listening on http://localhost:', PORT)
})

module.exports = app;
