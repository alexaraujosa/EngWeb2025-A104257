var express = require('express');
var router = express.Router();
const axios =  require("axios");

let data = new Date().toISOString().substring(0, 16);

router.get("/", function(req, res, next) {
    axios.get("http://localhost:3000/atores").then( resposta => {
        let atores = resposta.data;
        res.status(200).render("listaAtoresPage", { title: "Lista de Atores", atores: atores, date: data });
    }).catch( erro => {
        console.log(`ERRO: ${erro}`);
        res.status(500).render("error", { error: erro });
    })
});

router.get("/:idAtor", function(req, res, next) {
    let id = req.params.idAtor;
    axios.get("http://localhost:3000/atores/" + id).then( resposta => {
        let ator = resposta.data;
        res.status(200).render("perfilAtorPage", { title: "Perfil " + ator.nome, ator: ator, date: data });
    }).catch( erro => {
        console.log(`ERRO: ${erro}`);
        res.status(500).render("error", { error: erro });
    })
});

module.exports = router;
