
const path = require('path');
var express = require('express');
var router = express.Router();


/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/login.html'));
});



module.exports = router;

