const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	isbn: { type: String, unique: true, required: true  },
	status: { type: String, required: true },
	pageCount: {type: Number},
	published: { type: Boolean, default: true },
	thumbnailUrl: String,
	publishedDate: Date,
	shortDescription: String,
	longDescription: String,
	authors: [{ type: String }],
	categories:  [{ type: String }]
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
