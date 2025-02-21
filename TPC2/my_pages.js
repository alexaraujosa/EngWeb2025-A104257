// mypages.js
// 2025-02-20 alex
// HTML templates generating functions

export function genMainPage(data) {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Escola de Música</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>Consultas</h1>
                    </header>

                    <div class="w3-container">
                        <ul class="w3-ul">
                            <li><a href="/alunos">Lista de Alunos</a></li>
                            <li><a href="/cursos">Lista de Cursos</a></li>
                            <li><a href="/instrumentos">Lista de Instrumentos</a></li>
                        </ul>
                    </div>

                    <footer class="w3-container w3-purple">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

    return html;
}

export function genAlunosPage(alunos, data) {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Alunos | Escola de Música</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>Lista de Alunos</h1>
                    </header>

                    <div class="w3-container">
                        <table class="w3-table-all">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Ano do Curso</th>
                                <th>Instrumento</th>
                            </tr>`;
    alunos.forEach( aluno => {
        html += `
            <tr>
                <td><a href="/alunos/${aluno.id}">${aluno.id}</a></td>
                <td><a href="/alunos/${aluno.id}">${aluno.nome}</a></td>
                <td>${aluno.dataNasc}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.anoCurso}</td>
                <td>${aluno.instrumento}</td>
            </tr>
        `;
    })
    html += `
                        </table>
                        <h6><a href="/">Voltar</a></h6>
                    </div>
                    
                    <footer class="w3-container w3-purple">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

    return html;
}

export function genAlunoPage(aluno, data) {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Perfil Aluno | Escola de Música</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-gray">
                        <h1>Perfil do Aluno - <b>${aluno.nome}</b></h1>
                    </header>

                        <div class ="w3-container">
                            <h5><b>Identificador:</b> ${aluno.id}</h5>
                            <h5><b>Nome:</b> ${aluno.nome}</h5>
                            <h5><b>Data de Nascimento:</b> ${aluno.dataNasc}</h5>
                            <h5><b>Curso:</b> ${aluno.curso}</h5>
                            <h5><b>Ano do Curso:</b> ${aluno.anoCurso}</h5>
                            <h5><b>Instrumento:</b> ${aluno.instrumento}</h5>

                            <h6><a href="/alunos">Voltar</a></h6>
                        </div>

                    <footer class="w3-container w3-gray">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

    return html;
}

export function genCursosPage(cursos, data) {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Cursos | Escola de Música</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>Lista de Cursos</h1>
                    </header>

                    <div class="w3-container">
                        <table class="w3-table-all">
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>`;
    cursos.forEach( curso => {
        html += `
            <tr>
                <td><a href="/cursos/${curso.id}">${curso.id}</a></td>
                <td><a href="/cursos/${curso.id}">${curso.designacao}</a></td>
                <td>${curso.duracao}</td>
                <td>${curso.instrumento["#text"]}</td>
            </tr>
        `;
    })
    html += `
                        </table>
                        <h6><a href="/">Voltar</a></h6>
                    </div>

                    <footer class="w3-container w3-purple">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

    return html;
}

export function genFirstPartCursoPage(curso) {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Perfil Curso | Escola de Música</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-gray">
                        <h1>Perfil do Curso - <b>${curso.designacao}</b></h1>
                    </header>

                        <div class ="w3-container">
                            <h5><b>Identificador:</b> ${curso.id}</h5>
                            <h5><b>Nome:</b> ${curso.designacao}</h5>
                            <h5><b>Duração:</b> ${curso.duracao}</h5>
                            <h5><b>Instrumento:</b> ${curso.instrumento["#text"]}</h5>`;

    return html;
}

export function genSecondPartCursoPage(praticantes, data) {
    let html = "";
    
    if (Object.keys(praticantes).length > 0) html += `<h5><b>Lista de Alunos:</b></h5>`
    html += `<ul class="w3-ul">`;

    if (Object.keys(praticantes).length > 0) {
        praticantes.forEach( praticante => {
            html += `
                <li>${praticante.nome}</li>
            `
        });
    }

    html += `
                            </ul>
                            <h6><a href="/cursos">Voltar</a></h6>
                        </div>

                    <footer class="w3-container w3-gray">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

    return html;
}

export function genInstrumentosPage(instrumentos, data) {
    let html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumentos | Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Instrumentos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>`;
    instrumentos.forEach( instrumento => {
        html += `
            <tr>
                <td><a href="/instrumentos/${instrumento.id}">${instrumento.id}</a></td>
                <td><a href="/instrumentos/${instrumento.id}">${instrumento["#text"]}</a></td>
            </tr>
        `;
    })
    html += `
                        </table>
                        <h6><a href="/">Voltar</a></h6>
                    </div>

                    <footer class="w3-container w3-purple">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

return html;
}

export function genFirstPartInstrumentoPage(instrumento) {
    let html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Perfil Instrumento | Escola de Música</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-gray">
                        <h1>Perfil do Instrumento - <b>${instrumento["#text"]}</b></h1>
                    </header>

                        <div class ="w3-container">
                            <h5><b>Identificador:</b> ${instrumento.id}</h5>
                            <h5><b>Nome:</b> ${instrumento["#text"]}</h5>
                            <h5><b>Lista de Alunos:</b></h5>`;

    return html;
}

export function genSecondPartInstrumentoPage(praticantes, data) {
    let html = `<ul class="w3-ul">`;

    praticantes.forEach( praticante => {
        html += `
            <li>${praticante.nome}</li>
        `
    });

    html += `
                            </ul>
                            <h6><a href="/instrumentos">Voltar</a></h6>
                        </div>

                    <footer class="w3-container w3-gray">
                        <h5>Generated in EngWeb2025 ${data}</h5>
                    </footer>
                </div>
            </body>
        </html>
    `;

    return html;
}