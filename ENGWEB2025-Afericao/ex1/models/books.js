var mongoose = require("mongoose");

var booksSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    bookId: { type: String },
    title: { type: String },
    series: { type: String },
    author: [{ type: String }],
    rating: { type: String },
    description: { type: String },
    language: { type: String },
    isbn: { type: String },
    genres: [{ type: String }],
    characters: [{ type: String }],
    bookFormat: { type: String },
    edition: { type: String },
    pages: { type: String },
    publisher: { type: String },
    publishDate: { type: String },
    firstPublishDate: { type: String },
    awards: [{ type: String }],
    numRatings: { type: String },
    ratingsByStars: [{ type: String }],
    likedPercent: { type: String },
    setting: [{ type: String }],
    coverImg: { type: String },
    bbeScore: { type: String },
    bbeVotes: { type: String },
    price: { type: String }
}, { versionKey: false });

module.exports = mongoose.model("livros", booksSchema);