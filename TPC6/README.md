# TPC6 - Contratos Públicos  

**Data:** 24/03/2025  
**Nome:** Alex Araújo de Sá  
**Número Mecanográfico:** A104257  
![](./../Imagens/Avatar.png)

## Resumo

Implementação de um serviço de API de dados e de outro serviço para a interface de uma aplicação de contratos públicos.  
A API de dados deverá possuir rotas/pedidos que correspondem à implementação de operações CRUD sobre contratos.  
Por outro lado, o serviço da interface deverá permitir ao utilizador visualizar uma página inicial com uma tabela
que contem uma lista de registos com informação relativa a contratos, bem como uma página específica a cada contrato e, 
por fim, uma página específica como informação relativa a uma entidade.  

## Resultados

Os dois serviços cumprem com os requisitos estabelecidos, ficando o [serviço da API de dados](./apiContratos/) à escuta
na porta 16000, enquanto o [serviço da interface](./service/) permanece na porta 16001. O dataset foi normalizado de forma
ao identificador de cada registo não ser gerado pelo mongoDB.  