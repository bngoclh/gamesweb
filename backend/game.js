const path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  //const paramValue = req.params.param;
  res.sendFile(path.join(__dirname, '../app/game.html'));
});
  

module.exports = router;
