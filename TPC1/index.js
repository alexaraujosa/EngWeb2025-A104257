const axios = require("axios");
const http = require("http");

http.createServer( (req, res) => {

    switch(req.method) {
        case "GET": {
            if (req.url === "/") {
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                res.write("<h1>Oficina Automóvel</h1>");
                res.write(`<h2><a href="/reparacoes">Lista de Reparações</a></h2>`);
                res.write(`<h2><a href="/intervencoes">Lista de Intervenções</a></h2>`);
                res.write(`<h2><a href="/viaturas">Lista de Viaturas</a></h2>`);
                res.end();
            } else if (req.url === "/reparacoes") {
                axios.get("http://localhost:3000/reparacoes").then( result => {
                    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                    let reparacoes = result.data;
                    res.write("<h1>Lista de Reparações</h1>");
                    res.write(`<h2><a href="../">Voltar</a></h2>`);

                    res.write("<h3><ul>");
                    reparacoes.forEach( reparacao => {
                        res.write(`<a href="/reparacoes/${reparacao.id}"><li>`);
                        res.write(`${reparacao.nif} - ${reparacao.nome}`);
                        res.write(`</li></a>`);
                    })
                    res.write("</ul></h3>");

                    res.end();
                }).catch( error => {
                    if (!res.headersSent) {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + error + "</p>");
                        res.end();
                    }
                });
            } else if (req.url.match(/\/reparacoes\/.+/)) {
                let id_reparacao = req.url.split("/")[2];
                axios.get(`http://localhost:3000/reparacoes/${id_reparacao}`).then( result => {
                    let reparacao = result.data;
                    if (reparacao != undefined) {
                        res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                        res.write("<h1>Informação da Reparação</h1>");
                        
                        res.write(`<h3 style="font-weight: normal;">`);
                        res.write(`<b>Nome:</b> ${reparacao.nome}<br/>`);
                        res.write(`<b>NIF:</b> ${reparacao.nif}<br/>`);
                        res.write(`<b>Data da reparação:</b> ${reparacao.data}<br/>`);
                        res.write(`<b>Marca da viatura:</b> ${reparacao.marca}<br/>`);
                        res.write(`<b>Modelo da viatura:</b> ${reparacao.modelo}<br/>`);
                        res.write(`<b>Número de intervenções:</b> ${reparacao.nr_intervencoes}<br/>`);
                        res.write(`<b>Lista de intervenções:</b>`);
                        res.write("<ul>");
                        reparacao.intervencoes.forEach( intervencao => {
                            res.write(`<li><a href="/intervencoes/${intervencao}?reparacao=${reparacao.id}">${intervencao}</a></li>`);
                        });
                        res.write("</ul></h3>");
                        
                        res.write(`<h2><a href="/reparacoes">Voltar</a></h2>`);
                        res.end();
                    } else {
                        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    }
                }).catch( error => {
                    if (!res.headersSent) {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + error + "</p>");
                        res.end();
                    }
                });
            } else if (req.url === "/intervencoes") {
                axios.get("http://localhost:3000/intervencoes?_sort=codigo").then( result => {
                    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                    let intervencoes = result.data;
                    res.write("<h1>Lista de Intervenções</h1>");
                    res.write("<h3><ul>");
                    intervencoes.forEach( intervencao => {
                        res.write(`<a href="/intervencoes/${intervencao.codigo}"><li>`);
                        res.write(`${intervencao.codigo} ${intervencao.nome}`);
                        res.write(`</li></a>`);
                    })
                    res.write("</ul></h3>");

                    res.write(`<h2><a href="/">Voltar</a></h2>`);
                    res.end();
                }).catch( error => {
                    if (!res.headersSent) {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + error + "</p>");
                        res.end();
                    }
                });
            } else if (req.url.match(/\/intervencoes\/.+/)) {
                let url_parts = req.url.split("?reparacao=");
                let codigo_intervencao = url_parts[0].split("/")[2];
                let id_reparacao = url_parts[1] ? url_parts[1] : "";
                axios.get(`http://localhost:3000/intervencoes?codigo=${codigo_intervencao}`).then( result => {
                    let intervencao = result.data[0];
                    if (intervencao != undefined) {
                        res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                        res.write("<h1>Informação da Intervenção</h1>");
                        res.write(`<h3 style="font-weight: normal;">`);
                        res.write(`<b>Código:</b> ${intervencao.codigo}<br/>`);
                        res.write(`<b>Nome:</b> ${intervencao.nome}<br/>`);
                        res.write(`<b>Descrição:</b> ${intervencao.descricao}<br/>`);
                        res.write(`</h3>`);

                        if (id_reparacao) res.write(`<h2><a href="/reparacoes/${id_reparacao}">Voltar</a></h2>`);
                        else res.write(`<h2><a href="/intervencoes">Voltar</a></h2>`);
                        res.end();
                    } else {
                        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    }
                }).catch( error => {
                    if (!res.headersSent) {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + error + "</p>");
                        res.end();
                    }
                });
            } else if (req.url === "/viaturas") {
                axios.get("http://localhost:3000/viaturas").then( result => {
                    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                    let viaturas = result.data;
                    res.write("<h1>Lista de Viaturas</h1>");
                    res.write(`<h2><a href="/">Voltar</a></h2>`);
                    res.write("<h3><ul>");
                    viaturas.forEach( viatura => {
                        res.write(`<li><a href="/viaturas/${viatura.matricula}">${viatura.matricula}</a></li>`);
                    });
                    res.write("</ul></h3>");

                    res.end();
                }).catch( error => {
                    if (!res.headersSent) {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + error + "</p>");
                        res.end();
                    }
                });
            } else if (req.url.match(/\/viaturas\/.+/)) {
                let matricula_viatura = req.url.split("/")[2];
                axios.get(`http://localhost:3000/viaturas?matricula=${matricula_viatura}`).then( result => {
                    let viatura = result.data[0];
                    if (viatura != undefined) {
                        res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
                        res.write("<h1>Informação da Viatura</h1>");
                        res.write(`<h3 style="font-weight: normal;">`);
                        res.write(`<b>Marca:</b> ${viatura.marca}</br>`);
                        res.write(`<b>Modelo:</b> ${viatura.modelo}</br>`);
                        res.write(`<b>Matrícula</b> ${viatura.matricula}</br>`);
                        res.write("</h3>");

                        res.write(`<h2><a href="/viaturas">Voltar</a></h2>`);
                        res.end();
                    } else {
                        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                        res.end();
                    }
                }).catch( error => {
                    if (!res.headersSent) {
                        res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                        res.write("<p>" + error + "</p>");
                        res.end();
                    }
                });
            } else {
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.end();
            }
            break;
        }
        default: {
            res.writeHead(405, { "Content-Type": "text/html;charset=utf-8" });
            res.end();
            break;
        }
    }

}).listen(1337);