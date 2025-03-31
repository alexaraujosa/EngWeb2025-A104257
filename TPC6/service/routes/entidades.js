var express = require('express');
var axios = require("axios");
var router = express.Router();

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:16000/contratos?entidadeNIPC=" + req.params.id).then( resposta => {
    let contratos = resposta.data;
    if (contratos.length > 0) {
        let nomeEntidade = contratos[0].entidade_comunicante;
        let somatorio = 0;
        contratos.forEach( contrato => {
            somatorio += contrato.precoContratual;
        })

        res.status(200).render('entidadeIndividualPage', 
            { 
                nipc: req.params.id, 
                nome: nomeEntidade,
                contratos: contratos, 
                valor: somatorio 
            }
        );
    } else {
        res.status(500).render('error', { error: "Error while fetching contratos, because the list is empty." });
    }
  }).catch( erro => {
    res.status(500).render('error', { error: erro });
  })
});

module.exports = router;
