# TPC1 - A Oficina

**Data:** 11/02/2025  
**Nome:** Alex Araújo de Sá  
**Número Mecanográfico:** A104257  
![](./../Imagens/Avatar.png)

## Resumo

Serviço implementado em nodejs, que consome uma API de dados servida pelo json-server da oficina de reparações.  
Existem várias páginas web, contendo cada uma informação relativa a reparações, intervenções e viaturas.  
Apenas estão implementados pedidos GET.  

## Resultados

Criado um [script](dataset/generator.py) em python que permite separar o dataset em três listas, de forma a responder às queries pretendidas.  
[Serviço](index.js) desenvolvido em nodejs, utilizando a porta 1337, obtendo os dados disponibilizados pelo json-server na porta 3000.  
Na página inicial, existem três redirecionadores:  

- **Página de Reparações:** Lista de reparações prestadas aos clientes, contendo cada linha o nif e o nome do cliente.  
- **Página de Intervenções:** Lista de intervenções realizadas na oficina, contendo cada linha o código e o respetivo nome.
- **Página de Viaturas:** Lista de viaturas reparadas, contendo cada linha a matrícula da viatura.  

Em cada página, exceto na inicial, é possível retroceder para a página anterior através do botão Voltar.

