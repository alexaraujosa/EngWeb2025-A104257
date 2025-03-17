var express = require('express');
var router = express.Router();

let data = new Date().toISOString().substring(0, 16);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplicação do Cinema', date: data });
});

module.exports = router;
