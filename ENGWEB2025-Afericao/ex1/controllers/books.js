var Books = require("../models/books");

module.exports.getBooks = () => {
    return Books
            .find()
            .sort({"_id": 1})
            .exec();
}

module.exports.getBooksById = (id) => {
    return Books
            .findById({_id: id})
            .exec();
}

module.exports.getBooksByCharater = (character) => {
    return Books
            .find({characters: character})
            .exec();
}

module.exports.getBooksByGenre = (genre) => {
    return Books
            .find({genres: genre})
            .exec();
}


module.exports.getBooksGenres = () => {
    return Books
            .find()
            .distinct("genres")
            .sort("genres")
            .exec();
}

module.exports.getBooksCharacters = () => {
    return Books
            .find()
            .distinct("characters")
            .sort("characters")
            .exec();
}

module.exports.insert = livro => {
    let livroToSave = new Books(livro);
    return livroToSave.save();
}

module.exports.update = (livro, id) => {
    return Books
            .findByIdAndUpdate(id, livro, {new: true})  // O new devolve o objeto antes de ser atualizado
            .exec();
}

module.exports.delete = id => {
    return Books
            .findByIdAndDelete(id, {new: true})  // O new devolve o objeto antes de ser atualizado
            .exec();
}