let crypto = require('crypto');

const SECRET = crypto.randomBytes(64).toString('hex');

const uploadFolder = "uploads/";
const types = [
  "reflexao",
  "educacao",
  "desenvolvimento-pessoal",
  "saude-mental",
  "desporto",
  "tecnologia",
  "vida-academica",
  "criatividade",
  "identidade",
  "relacionamentos",
  "motivacao",
  "cultura-digital",
  "trabalho",
  "autoestima",
  "voluntariado",
  "musica",
  "ambiente",
  "viagens",
  "opinioes",
  "futuro"
];

module.exports = { SECRET, uploadFolder, types };