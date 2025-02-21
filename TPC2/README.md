# TPC2 - Escola de Música

**Data:** 17/02/2025  
**Nome:** Alex Araújo de Sá  
**Número Mecanográfico:** A104257  
![](./../Imagens/Avatar.png)

## Resumo

Serviço em nodejs que consome uma API de dados servida pelo json-server do [dataset](db.json), criando um website com as seguintes características:  

1. Página principal: Lista de alunos, Lista de cursos, Lista de Instrumentos;
2. Página de alunos: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);
3. Página de cursos: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);
4. Página de instrumentos: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).

## Resultados

O [serviço](index.js) desenvolvido cumpre com todos os requisitos impostos, servindo um website na porta 3030.  
Criado um [script](my_pages.js) que permite a criação das páginas em html de uma forma mais organizada e rápida.  
Utilizada a framework de [css](w3.css) (W3.CSS), permitindo a manipulação de mais pedidos, para além de alterar o estilo e layout do website.  