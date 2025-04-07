var express = require('express');
var router = express.Router();

var Books = require("../controllers/books");

router.post("/", function(req, res, next) {
    Books.insert(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
})

router.delete("/:id", function(req, res, next) {
    Books.delete(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.put("/:id", function(req, res, next) {
    Books.update(req.body, req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get("/", function(req, res, next) {
    if (req.query.charater) {
        Books.getBooksByCharater(req.query.charater)
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    } else if (req.query.genre) {
        Books.getBooksByGenre(req.query.genre)
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    } else {
        Books.getBooks()
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    }
});

router.get("/genres", function(req, res, next) {
    Books.getBooksGenres()
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get("/characters", function(req, res, next) {
    Books.getBooksCharacters()
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get("/:id", function(req, res, next) {
    let id = req.params.id;
    Books.getBooksById(id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;