var express = require('express');
var router = express.Router();
var debug = require('debug')('routers:index');
debug('hello, index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
