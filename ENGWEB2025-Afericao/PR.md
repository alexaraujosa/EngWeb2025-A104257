# Ficha de Aferição 2024/2025  

## Persistência de Dados  

Após analisar o dataset disponibilizado, comecei por corrigir as incoerências que haviam nos campos:  

1. Author
2. Genres
3. Characters
4. Awards
5. RatingByStars
6. Setting

O identificador utilizado para cada registo é numérico sequencial, correspondendo ao campo `_id`.  

## Setup da Base de Dados

A base de dados está a correr num docker container, podendo a sua execução ser replicada pelos comandos:  

```shell
sudo docker run -d -p 27017:27017 --name mongoEW mongo
sudo docker cp dataset/data.json mongoEW:/tmp
sudo docker exec -it mongoEW sh
```
O primeiro comando serve para criar um docker com o nome `mongoEW`, mapeando a porta da máquina com a porta 27017 do container.  
O segundo serve para copiar o dataset para dentro do container, mais especificamente para a diretorio `/tmp`.  
Por fim, obtemos uma shell no container.  

Agora dentro da shell do docker vamos importar o dataset através do mongoimport:  

```shell
mongoimport /tmp/data.json -d livros -c livros --jsonArray
```

## Execução das Aplicações

Antes de executarmos as aplicações, precisamos de instalar as dependências, através da execução do seguinte comando
nas diretorias `ex1` e `ex2`:  

```shell
npm install
```

De seguida, devemos começar por executar a API de dados que será consumida posteriormente pela segunda aplicação. Para tal,
executamos o seguinte comando na diretorio `ex1`:  

```shell
npm start
```

Desta forma, a API de dados fica a correr na porta `17000`.

Para finalizar, devemos executar o mesmo comando na diretorio `ex2` de forma à interface ficar disponível na porta `17001`.  