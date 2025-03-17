# TPC4 - Cinema

**Data:** 10/03/2025  
**Nome:** Alex Araújo de Sá  
**Número Mecanográfico:** A104257  
![](./../Imagens/Avatar.png)

## Resumo

Desenvolvido serviço que utiliza a framework `Express.js` servido pelo `json-server` como API de dados.  
O serviço deverá permitir ao utilizador:  
- Listar os filmes
- Editar e apagar um filme
- Listar os atores
- Mostrar um perfil do ator com os filmes em que participou

## Resultados

O serviço cumpre todos os requisitos propostos, ficando à escuta na porta `3333`.  
Antes de tudo, foi necessário normalizar o dataset disponibilizado, tendo criado um [script](./scripts/normalizer.py) para tal, resultando
neste [dataset](./database/cinema.json).
Este normalizador cria um identificador númerico para cada filme, assim como entradas referentes aos atores, para os quais 
são adicionados os filmes em que participaram e também um identificador númerico utilizado para aceder ao perfil individual de cada um.  
O serviço possui três rotas relativos aos módulos da [mainpage](./routes/index.js), dos [filmes](./routes/filmes.js) e [atores](./routes/atores.js).