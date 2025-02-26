# TPC3 - Alunos com operações CRUD  

**Data:** 24/02/2025  
**Nome:** Alex Araújo de Sá  
**Número Mecanográfico:** A104257  
![](./../Imagens/Avatar.png)

## Resumo

Serviço em nodejs que consome dados disponibilizados pelo json-server através uma API, possibilitando o utilizador de realizar todas as operações CRUD.  
O serviço permite a visualização de todos os alunos, assim como a visualização do perfil de cada aluno.  
Para além disso, o utilizador pode editar a informação de um aluno, bem como remover um aluno.  

## Resultados

O [serviço](./src/server.js) corre na porta **7777**, consumindo os dados do json-server na porta **3000**.  
O dataset [original](./dataset/alunos.csv) encontrava-se no formato **csv**, tendo sido convertido para **json** utilizando um conversor online,
já que este possui poucas entradas e está normalizado, ficando assim possivel a disponibilização do [dataset](./dataset/alunos.json) no json-server.     
As operações de create, read, update e delete foram totalmente implementadas, tendo o utilizador de confirmar caso deseje
remover um aluno.  