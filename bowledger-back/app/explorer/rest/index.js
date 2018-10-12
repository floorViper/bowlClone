var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(
    'index-path:::',
    path.join(__dirname, '../../../public', 'index.html')
  );
  res.sendFile(path.join(__dirname, '../../../public', 'index.html'));
});

module.exports = router;
