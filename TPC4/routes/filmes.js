var express = require('express');
var router = express.Router();
const axios =  require("axios");

let data = new Date().toISOString().substring(0, 16);

router.get("/", function(req, res, next) {
    axios.get("http://localhost:3000/filmes").then( resposta => {
        let filmes = resposta.data;
        res.status(200).render("listaFilmesPage", { title: "Lista de Filmes", filmes: filmes, date: data });
    }).catch( erro => {
        console.log(`ERRO: ${erro}`);
        res.status(500).render("error", { error: erro });
    })
});

router.get("/editar/:idFilme", function(req, res, next) {
    let id = req.params.idFilme;
    axios.get("http://localhost:3000/filmes/" + id).then( resposta => {
        let filme = resposta.data;
        res.status(200).render("editarFilmePage", { title: "Editar Filme", filme: filme, date: data });
    }).catch( erro => {
        console.log(`ERRO: ${erro}`);
        res.status(500).render("error", { error: erro });
    })
});

router.get("/apagar/:idFilme", function(req, res, next) {
    let id = req.params.idFilme;
    axios.delete("http://localhost:3000/filmes/" + id).then( resposta => {
        res.status(200).redirect("/filmes");
    }).catch( erro => {
        console.log(`ERRO: ${erro}`);
        res.status(500).render("error", { error: erro });
    })
});

router.post("/editar/:idFilme", function(req, res, next) {
    let id = req.params.idFilme;
    let body = req.body;
    body.cast = JSON.parse(body.cast);
    body.genres = JSON.parse(body.genres);

    axios.put("http://localhost:3000/filmes/" + id, body).then( resposta => {
        res.status(200).redirect("/filmes");
    }).catch( erro => {
        console.log(`ERRO: ${erro}`);
        res.status(500).render("error", { error: erro });
    })
});

module.exports = router;
