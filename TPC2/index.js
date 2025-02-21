const http = require("http");
const axios = require("axios");
const fs = require("fs");
const mypages = require("./my_pages.js");

http.createServer( (req, res) => {
    let data = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + data);

    switch (req.method) {
        case "GET": {
            if (req.url === "/") {
                res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                res.write(mypages.genMainPage(data));
                res.end();
            } else if (req.url.match(/w3\.css$/)) {
                fs.readFile("w3.css", (err, dados) => {
                    if (err) {
                        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                        res.end("<p>Erro na leitura do ficheiro: " + err + "</p>");
                    } else {
                        res.writeHead(200, { "Content-Type": "text/css" });
                        res.end(dados);
                    }
                });
            } else if (req.url === "/alunos") {
                axios.get("http://localhost:3000/alunos").then( resultado => {
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write(mypages.genAlunosPage(resultado.data, data));
                    res.end();
                }).catch( (err) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                    res.write("<p>" + err + "</p>");
                    res.end();
                });
            } else if (req.url.match(/\/alunos\/[a-zA-Z0-9%]+/)) {
                let idAluno = req.url.split("/")[2];
                axios.get("http://localhost:3000/alunos/" + idAluno).then( resultado => {
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write(mypages.genAlunoPage(resultado.data, data));
                    res.end();
                }).catch( (err) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                    res.write("<p>" + err + "</p>");
                    res.end();
                });
            } else if (req.url === "/cursos") {
                axios.get("http://localhost:3000/cursos"). then( resultado => {
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write(mypages.genCursosPage(resultado.data, data));
                    res.end();
                }).catch( (err) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                    res.write("<p>" + err + "</p>");
                    res.end();
                });
            } else if (req.url.match(/\/cursos\/[a-zA-Z0-9%]+/)) {
                let idCurso = req.url.split("/")[2];
                Promise.all([
                    axios.get("http://localhost:3000/cursos/" + idCurso),
                    axios.get("http://localhost:3000/alunos?curso=" + idCurso)
                ]).then( ([cursoResultado, alunosResultado]) => {
                    let html = mypages.genFirstPartCursoPage(cursoResultado.data);
                    html += mypages.genSecondPartCursoPage(alunosResultado.data, data);
            
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write(html);
                    res.end();
                }).catch( (err) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                    res.write("<p>" + err + "</p>");
                    res.end();
                });
            } else if (req.url === "/instrumentos") {
                axios.get("http://localhost:3000/instrumentos").then( resultado => {
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write(mypages.genInstrumentosPage(resultado.data, data));
                    res.end();
                }).catch( (err) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                    res.write("<p>" + err + "</p>");
                    res.end();
                });
            } else if (req.url.match(/\/instrumentos\/[a-zA-Z0-9%]+/)) {
                let idInstrumento = req.url.split("/")[2];
                axios.get("http://localhost:3000/instrumentos/" + idInstrumento).then( instrumentoResultado => {

                    axios.get("http://localhost:3000/alunos?instrumento=" + instrumentoResultado.data["#text"]).then( alunosResultado => {
                        let html = mypages.genFirstPartInstrumentoPage(instrumentoResultado.data);
                        html += mypages.genSecondPartInstrumentoPage(alunosResultado.data, data);

                        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                        res.write(html);
                        res.end();
                    }).catch( (err) => {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + err + "</p>");
                        res.end();
                    });
                    
                }).catch( (err) => {
                    res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                    res.write("<p>" + err + "</p>");
                    res.end();
                });
            }

            break;
        }
        default: {
            res.writeHead(405, { "Content-Type": "text/html;charset=utf-8"});
            res.write("<p>Funcionalidade não implementada.</p>");
            res.end();
            break;
        }
    }

}).listen(3030);

console.log("Servidor à escuta na porta 3030.")