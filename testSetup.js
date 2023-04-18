const mongoose = require('mongoose');

const Book = require('./src/book');
const Genre = require('./src/genre');

const db = 'practice-mongodb';
const url = 'mongodb://127.0.0.1:27017/';

const main = async () => await mongoose.connect(url + db);

main().catch(console.err);

beforeEach(async () => {
	await Book.deleteMany({});
	await Genre.deleteMany({});
});
afterEach(async () => {
	await Book.deleteMany({});
	await Genre.deleteMany({});
});
