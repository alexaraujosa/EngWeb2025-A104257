var express = require('express');
var router = express.Router();

var Contratos = require("../controllers/contratos");

router.get("/", function(req, res, next) {
    if (req.query.entidade) {
        Contratos.getContratosByEntidade(req.query.entidade)
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    } else if (req.query.entidadeNIPC) {
        Contratos.getContratosByEntidadeNIPC(req.query.entidadeNIPC)
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    } else if (req.query.tipo) {
        Contratos.getContratosByTipo(req.query.tipo)
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    } else {        
        Contratos.getContratos()
            .then(data => res.status(200).jsonp(data))
            .catch(erro => res.status(500).jsonp(erro));
    }
});

router.get("/entidades", function(req, res, next) {
    Contratos.getEntidades()
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get("/tipos", function(req, res, next) {
    Contratos.getTipos()
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.get("/:id", function(req, res, next) {
    Contratos.getContratoById(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});


router.post("/", function(req, res, next) {
    console.log(req.body);
    Contratos.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro));
});

router.put("/:id", function(req, res, next) {
    Contratos.update(req.body, req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});

router.delete("/:id", function(req, res, next) {
    Contratos.delete(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
});


module.exports = router;