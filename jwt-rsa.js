'use strict'

var nJwt = require('jwt-node')
const fs = require('fs')
const path = require('path')

exports.getPublicKey = getPublicKey
exports.getPrivateKey = getPrivateKey
exports.errorResponse = errorResponse


var keys = {}



function getPublicKey(iss, kid) {
  if (!keys[`public/${iss}/${kid}`]) {
    keys[`public/${iss}/${kid}`] = fs.readFileSync(path.join(__dirname, `./keys/public/${iss}/${kid}_rsa.pem`), 'utf8')
    if (process.env.SUPPRESS_LOGGING !== 'true')
      console.log('DEBUG: load public key:', `public/${iss}/${kid}`)
  }
  return keys[`public/${iss}/${kid}`]
}


function getPrivateKey(iss, kid) {
  if (!keys[`private/${iss}/${kid}`]) {
    keys[`private/${iss}/${kid}`] = fs.readFileSync(path.join(__dirname, `./keys/private/${iss}/${kid}_rsa`), 'utf8')
    if (process.env.SUPPRESS_LOGGING !== 'true')
      console.log('DEBUG: load private key:', `private/${iss}/${kid}`)
  }
  return keys[`private/${iss}/${kid}`]
}

function errorResponse(res, code, message) {
  res.status(code).json({
    error: true,
    data: {
      code: code,
      message: message
    }
  })
}

exports.requireJwtToken = function (req, res, next) {
  if (res.locals.jwt_authorized === true) {
    return next('route')
  }
  errorResponse(res, 401, 'Unauthorized (4)')
  next(fmtLogMsg(req, 'INFO', 'Unauthorized(4)', 401))
}

exports.btJwtMiddleware = function (req, res, next) {

  //console.log('before')
  if (res.locals === undefined)
    res.locals = {}
  if (res.locals.authorized === undefined)
    res.locals.authorized = false
  res.locals.jwt_authorized = false

  var token = ''
  var auth = req.headers['authorization']
  var publicKey = ''
  if (auth) {
    //console.log('auth')
    var tmp = auth.split(' ') // Split on a space, the original auth looks like  "Bearer Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    if (tmp && tmp.length > 1) {
      //console.log('jwt')
      var token = tmp[1]
    } else {
      // ignore if there is no token, res.locals.jwt_authorized will be false
      return next()
    }
  
  try {
    var jwt = new nJwt.Parser().parse(token);
  } catch (err) {
    //console.log('ERROR:Parser() ', err)
    errorResponse(res, 401, 'Unauthorized (1)')
    next(fmtLogMsg(req, 'INFO', 'Unauthorized(1)', 401))
    return
  }
  // lookup the key

  try {
    publicKey = getPublicKey(jwt.body.iss, jwt.header.kid)
  } catch (err) {
    errorResponse(res, 401, 'Unauthorized (2)')
    return next(fmtLogMsg(req, 'INFO', 'Unauthorized(2)', 401))
  }
  // then verify
  //		console.log('publickey:',publicKey)

  var verifier = new nJwt.Verifier()
    .setSigningAlgorithm('RS256')
    .setSigningKey(publicKey)
    .verify(token, function (err, verifiedJwt) {
      //console.timeEnd('verify ' + req.id.toString())
      if (err) {
        //console.log(err)
        if (err.name === 'JwtParseError' && err.userMessage === 'Jwt is expired') {
          errorResponse(res, 401, 'Token is expired')
          next(fmtLogMsg(req, 'INFO', 'Token is expired', 401))
        } else {
          errorResponse(res, 401, 'Unauthorized (3)')
          next(fmtLogMsg(req, 'INFO', 'Unauthorized(3)', 401))
        }
        //console.log(err)
        
      } else {
        //console.log('verifiedJwt:', verifiedJwt)
        res.locals.authorized = res.locals.jwt_authorized = true
        res.locals.verifiedJwt = verifiedJwt
        res.locals.userId = verifiedJwt.body.sub
        next()
      }
    });
  } else {
    next()
  }
}

function fmtLogMsg(req, level, message, code) {
  return `jwt ${req.id} ${level} ${message} ${code}`
  
}