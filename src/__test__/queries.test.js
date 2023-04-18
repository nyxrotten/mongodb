const {
	bookByTitle,
	booksByGenre,
	booksByPageCount,
	fullBookById,
	allBooksByLatest,
	addSimilarBooks,
} = require('../queries');

const Book = require('../book');
const Genre = require('../genre');

const mongoose = require('mongoose');

describe('queries', () => {
	describe('bookByTitle', () => {
		test('get book by title', async () => {
			const book = await Book.create({
				title: 'Microsoft Office Essentials 4',
				isbn: '193398833X',
				status: 'PUBLISH',
				genre: new mongoose.Types.ObjectId(),
			});

			const match = await bookByTitle(book.title);
			expect(match.id).toBe(book.id);
		});
	});

	describe('booksByGenre', () => {
		test('get book by genre', async () => {
			const book = await Book.create({
				title: 'Microsoft Office Essentials 5',
				isbn: '1933988693X',
				status: 'PUBLISH',
				genre: new mongoose.Types.ObjectId(),
			});
			const [match] = await booksByGenre(book.genre);
			expect(match.genre.toString()).toBe(book.genre.toString());
		});
	});

	describe('booksByPageCount', () => {
		test('find books in between length by page count', async () => {
			const genre = new mongoose.Types.ObjectId();

			await Book.create([
				{
					title: 'Microsoft Office Essentials 10',
					isbn: '193398111X',
					status: 'PUBLISH',
					pageCount: 500,
					genre,
				},
				{
					title: 'Microsoft Office Essentials 11',
					isbn: '193398141M',
					status: 'PUBLISH',
					pageCount: 50,
					genre,
				},
				{
					title: 'Microsoft Office Essentials 12',
					isbn: '193398131D',
					status: 'PUBLISH',
					pageCount: 100,
					genre,
				},
				{
					title: 'Microsoft Office Essentials 13',
					isbn: '193398121D',
					status: 'PUBLISH',
					pageCount: 1000,
					genre,
				},
			]);

			const matches = await booksByPageCount(500, 100);
			expect(matches).toHaveLength(2);
		});
	});
	describe('fullBookById', () => {
		test('finds book by id and populates genre everything', async () => {
			const genre = await Genre.create({
				name: 'Crime',
			});
			const book = await Book.create({
				title: 'Microsoft Office Essentials 14',
				isbn: '113398131D',
				status: 'PUBLISH',
				genre: genre.id,
			});
			const book2 = await Book.create({
				title: 'Microsoft Office Essentials 15',
				isbn: '113391031D',
				status: 'PUBLISH',
				genre: genre.id,
				similarBooks: [book.id],
			});

			const match = await fullBookById(book2.id);
			expect(match.genre._id.toString()).toBe(genre.id.toString());
		});
	});
	describe('allBooksByLatest', () => {
		test('only selects fields given', async () => {
			const genre = new mongoose.Types.ObjectId();

			const today = new Date();
			const yesterday = new Date(today);

			yesterday.setDate(yesterday.getDate() - 1);

			await Book.create([
				{
					title: 'Microsoft Office Essentials 16',
					isbn: '313391031D',
					status: 'PUBLISH',
					publishedDate: yesterday,
					genre,
				},
				{
					title: 'Microsoft Office Essentials 17',
					isbn: '313391091D',
					status: 'PUBLISH',
					publishedDate: today,
					genre,
				},
				{
					title: 'Microsoft Office Essentials 18',
					isbn: '313391231D',
					status: 'PUBLISH',
					publishedDate: yesterday,
					genre,
				},
			]);

			const matches = await allBooksByLatest({
				title: 1,
				isbn: 1,
				publishedDate: 1,
			});
			expect(matches).toHaveLength(3);

			matches.forEach((match) => {
				const book = match.toJSON();
				expect(book).not.toHaveProperty('published');
				expect(book).not.toHaveProperty('status');
			});

			const latest = matches[0];

			expect(latest.publishedDate).toEqual(today);
		});
	});
	describe('addSimilarBooks', () => {
		test('should not override similar books that are there', async () => {
			const book = await Book.create({
				title: 'Microsoft Office Essentials 19',
				isbn: '313393231D',
				status: 'PUBLISH',
				genre: new mongoose.Types.ObjectId(),
				similarBooks: [new mongoose.Types.ObjectId()],
			});

			const updated = await addSimilarBooks(book.id, [
				new mongoose.Types.ObjectId(),
				new mongoose.Types.ObjectId(),
			]);
			expect(updated.similarBooks).toHaveLength(3);
		});
	});
});
