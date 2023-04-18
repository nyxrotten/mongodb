const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	isbn: { type: String, required: true, unique: true },
	status: { type: String, required: true },
	pageCount: Number,
	published: { type: Boolean, default: true },
	thumbnailUrl: String,
	publishedDate: Date,
	description: {
		shortDescription: String,
		longDescription: String,
	},
	authors: [{ type: String }],
	categories: [{ type: String }],
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
