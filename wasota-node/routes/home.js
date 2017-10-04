var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('partial/home.html');
});


module.exports = router;
