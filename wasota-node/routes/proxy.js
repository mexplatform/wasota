var express = require('express');
var request = require('request');
var router = express.Router();

var fs = require('fs');
var sess = [];

var wasotaAPI = "http://wasota.aksw.org/api";
// var wasotaAPI = "http://localhost:8090"


router.get('/*', function (req, res, next) {
  var query = wasotaAPI + req.url;
  console.log("GET request to: " + query);
  

  request(query, function (error, response, body) {
    try {
      console.log("API response: " + body);
      res.send((JSON.parse(body)));
    } catch (E) {
      console.log(E);
    }
  });
});

router.post('/*', function (req, res, next) {
  var query = wasotaAPI + req.url;
  console.log("POST request to: " + query);

  var requestParams = {
    method: 'POST',
    uri: query,
    body: JSON.stringify(req.body),
    headers: {
    }
  }

  // check if user just authenticated
  if (req.body.user !== undefined && req.body.password !== undefined) {
    var auth = 'Basic ' + new Buffer(req.body.user + ':' + req.body.password).toString('base64');
    requestParams.headers.Authorization = auth;
    // req.session.user = req.body.user;
    // req.session.password = req.body.password;
  } 
  // check is the session is still working
  // else {
  //   if (req.session && req.session.user && req.passwd) {
  //     var auth = 'Basic ' + new Buffer(req.session.user + ':' + req.session.password).toString('base64');
  //     requestParams.headers.Authorization = auth;
  //   }
  // }

  request(
    requestParams
    , function (error, response, body) {
      if (error) {
        return console.error('error:', error);
      }
      console.log("API response: " + body);

      var JSONBody = (JSON.parse(body));

      // if (req.body.user !== undefined)
      //   if (JSONBody.status !== undefined) {
      //     // console.log(req.session)
      //     // sess = req.session;
      //     sess.user = req.body.user;
      //     // sess.password;
      //   }

      res.send((JSON.parse(body)));
    });
});


router.put('/*', function (req, res, next) {
  var query = wasotaAPI + req.url;
  console.log("PUT request to: " + query);

  var requestParams = {
    method: 'PUT',
    uri: query,
    body: JSON.stringify(req.body),
    headers: {
    }
  }
  
  if (req.body.user !== undefined && req.body.password !== undefined) {
    var auth = 'Basic ' + new Buffer(req.body.user + ':' + req.body.password).toString('base64');
    requestParams.headers.Authorization = auth;
    console.log(requestParams);
  }




  request(requestParams
    , function (error, response, body) {
      if (error) {
        return console.error('error:', error);
      }
      console.log("API response: " + body);

      res.send((JSON.parse(body)));

    });
});


module.exports = router;