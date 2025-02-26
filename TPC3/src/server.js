var http = require('http');
var axios = require('axios');
const { parse } = require('querystring');

var templates = require('./templates.js');
var static = require('./static.js');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    }
    else {
        switch(req.method) {
            case "GET": {

                if (req.url === "/" || req.url === "/alunos") {
                    axios.get("http://localhost:3000/alunos").then( resultado => {
                        let alunos = resultado.data;
                        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8 "});
                        res.write(templates.studentsListPage(alunos, d));
                        res.end();
                    }).catch( erro => {
                        console.log(`ERROR: ${erro}`);
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    });
                } else if (req.url.match(/\/alunos\/(A|PG)\d+$/)) {
                    let id = req.url.split("/")[2];
                    axios.get(`http://localhost:3000/alunos/${id}`).then( resultado => {
                        let aluno = resultado.data;
                        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8 "});
                        res.write(templates.studentPage(aluno, d));
                        res.end();
                    }).catch( erro => {
                        console.log(`ERROR: ${erro}`);
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    })
                } else if (req.url === "/alunos/registo") {
                    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                    res.write(templates.studentFormPage(d));
                    res.end();
                } else if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {
                    let id = req.url.split("/")[3];
                    axios.get(`http://localhost:3000/alunos/${id}`).then( resultado => {
                        let aluno = resultado.data;
                        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                        res.write(templates.studentFormEditPage(aluno, d));
                        res.end();
                    }).catch( erro => {
                        console.log(`ERROR: ${erro}`);
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    });
                } else if (req.url.match(/\/alunos\/delete\/(A|PG)\d+$/)) {
                    let id = req.url.split("/")[3];
                    axios.delete(`http://localhost:3000/alunos/${id}`).then( _ => {
                        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                        res.write(templates.studentDeletePage(id, d));
                        res.end();
                    }).catch( erro => {
                        console.log(`ERROR: ${erro}`);
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html;charset=utf-8 "});
                    res.end();
                }

                break;
            }
            case "POST": {

                if (req.url === "/alunos/registo") {
                    collectRequestBodyData(req, resultado => {
                        if (resultado) {
                            axios.post("http://localhost:3000/alunos", resultado).then( resposta => {
                                res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
                                res.write(templates.studentRegisterConfirm(resposta.data, d));
                                res.end();
                            }).catch( erro => {
                                console.log(`ERROR: ${erro}`);
                                res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                                res.end();
                            })
                        } else {
                            res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                            res.write(templates.errorPage("Erro ao adicionar o aluno.", d));
                            res.end();
                        }
                    });
                } else if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {
                    collectRequestBodyData(req, resultado => {
                        if (resultado) {
                            let id = req.url.split("/")[3];
                            axios.put(`http://localhost:3000/alunos/${id}`, resultado).then( resposta => {
                                let aluno = resposta.data;
                                res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                                res.write(templates.studentEditConfirmPage(aluno, d));
                                res.end();
                            }).catch( erro => {
                                console.log(`ERROR: ${erro}`);
                                res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                                res.end();
                            })
                        } else {
                            res.writeHead(500, { "Content-Type": "text/html;chatset=utf-8" });
                            res.write(templates.errorPage("Erro ao editar o aluno.", d));
                            res.end();
                        }
                    }) 
                } else {
                    res.writeHead(404, { "Content-Type": "text/html;charset=utf-8 "});
                    res.end();
                }

                break;
            }



            // APENAS ACESSIVEL COM O POSTMAN
            case "PUT": {

                if (req.url.match(/\/alunos\/edit\/(A|PG)\d+$/)) {
                    collectRequestBodyData(req, resultado => {
                        if (resultado) {
                            let id = req.url.split("/")[3];
                            axios.put(`http://localhost:3000/alunos/${id}`, resultado).then( resposta => {
                                let aluno = resposta.data;
                                res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                                res.write(templates.studentEditConfirmPage(aluno, d));
                                res.end();
                            }).catch( erro => {
                                console.log(`ERROR: ${erro}`);
                                res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                                res.end();
                            })
                        } else {
                            res.writeHead(500, { "Content-Type": "text/html;chatset=utf-8" });
                            res.write(templates.errorPage("Erro ao editar o aluno.", d));
                            res.end();
                        }
                    }) 
                } else {
                    res.writeHead(404, { "Content-Type": "text/html;charset=utf-8 "});
                    res.end();
                }

                break;
            }   
            case "DELETE": {

                if (req.url.match(/\/alunos\/delete\/(A|PG)\d+$/)) {
                    let id = req.url.split("/")[3];
                    axios.delete(`http://localhost:3000/alunos/${id}`).then( _ => {
                        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
                        res.write(templates.studentDeletePage(id, d));
                        res.end();
                    }).catch( erro => {
                        console.log(`ERROR: ${erro}`);
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    });
                } else {
                    res.writeHead(404, { "Content-Type": "text/html;charset=utf-8 "});
                    res.end();
                }

                break;
            }
            default: {
                res.writeHead(500, { "Content-Type": "text/html;charset=utf-8 "});
                res.write(`<p>Método não suportado. URL: ${req.url} MÉTODO: ${req.method}</p>`);
                res.end();
            }
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



