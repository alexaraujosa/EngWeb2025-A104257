var express = require('express');
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:17000/books").then( resultado => {
    res.status(200).render('index', { title: 'Livros', livros: resultado.data });
  })
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  axios.get("http://localhost:17000/books/" + id).then( resultado => {
    res.status(200).render('livroIndiv', { livro: resultado.data });
  })
});

module.exports = router;
