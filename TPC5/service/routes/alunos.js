var express = require('express');
var router = express.Router();
var axios = require("axios");

let data = new Date().toISOString().substring(0, 16);

router.get('/', function(req, res, next) {
  axios.get("http://localhost:3000/alunos").then( resultado => {
    let students = resultado.data;

    res.status(200).render('studentsListPage', { slist: students, date: data});
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
});

router.get('/registo', function(req, res, next) {
  res.status(200);
  res.status(200).render("studentsFormPage", { date: data });
});

router.get("/:id", function(req, res, next) {
  let id = req.params.id;
  axios.get("http://localhost:3000/alunos/" + id).then( resultado => {
    let aluno = resultado.data;
    console.log(aluno)

    res.status(200).render('studentPage', { aluno: aluno, date: data });
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  axios.get("http://localhost:3000/alunos/" + id).then( resultado => {
    let aluno = resultado.data;

    res.status(200).render("studentFormEditPage", { aluno: aluno, date: data });
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
});

router.post("/edit/:id", function(req, res, next) {
  let id = req.params.id;
  let aluno = req.body;

  axios.put("http://localhost:3000/alunos/" + id, aluno).then( resultado => {
    res.status(201).redirect("/alunos");
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
});

router.put("/edit/:id", function(req, res, next) {
  let id = req.params.id;
  let aluno = req.body;

  axios.put("http://localhost:3000/alunos/" + id, aluno).then( resultado => {
    res.status(201).redirect("/alunos");
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
});

router.post("/registo", function(req, res, next) {
  let result = req.body;
  axios.post("http://localhost:3000/alunos", result).then( resultado => {
    res.status(201).redirect("/alunos");
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
});

router.get("/delete/:id", function(req, res, next) {
  let id = req.params.id;
  axios.delete("http://localhost:3000/alunos/" + id).then( resultado => {
    res.status(200).redirect("/alunos");
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
})

router.delete("/delete/:id", function(req, res, next) {
  let id = req.params.id;
  axios.delete("http://localhost:3000/alunos/" + id).then( resultado => {
    res.status(200).redirect("/alunos");
  }).catch( erro => {
    console.log(`ERRO: ${erro}`);
    res.status(500).render("error", { error: erro });
  })
})

module.exports = router;
