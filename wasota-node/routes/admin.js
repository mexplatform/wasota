var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("GET request on /admin")
  // console.log(req.session)
  if(req.cookies.sessionId)
      res.render('partial/admin/area.html');
  else
      res.render('partial/login.html')
});

module.exports = router;