var express = require('express');
var axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:16000/contratos").then( resposta => {
    let contratos = resposta.data;
    res.status(200).render('index', { title: 'Interface de Contratos', contratos: contratos});
  }).catch( erro => {
    res.status(500).render('error', { error: erro });
  });
});

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:16000/contratos/" + req.params.id).then( resposta => {
    let contrato = resposta.data;
    res.status(200).render('contratosIndividualPage', { title: 'Contrato #' + req.params.id, contrato: contrato });
  }).catch( erro => {
    res.status(500).render('error', { error: erro });
  })
});

module.exports = router;
