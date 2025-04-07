var express = require('express');
var router = express.Router();
var axios = require("axios");

router.get('/:id', function(req, res, next) {
  let id = req.params.id;

  axios.get("http://localhost:17000/books/").then( resultado => {
    let livros = resultado.data;

    let livrosByAuthor = livros.filter(b => b.author && b.author.includes(id));
    res.status(200).render('autorIndiv', { id: id, nome: id, livros: livrosByAuthor, total: livrosByAuthor.length });
  })
});

module.exports = router;
