const Book = require('./book');

const bookByTitle = (title) => {};

const booksByGenre = (genreId) => {};

const booksByPageCount = (maxPageCount, minPageCount) => {};

const fullBookById = (id) => {};

const allBooksByLatest = (fieldsToSelect) => {};

const addSimilarBooks = (bookId, similarBooks) => {};

module.exports = {
	bookByTitle,
	booksByGenre,
	booksByPageCount,
	fullBookById,
	allBooksByLatest,
	addSimilarBooks,
};
