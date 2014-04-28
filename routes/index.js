var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  console.log("route picked up in /routes/index.js");
});



module.exports = router;
