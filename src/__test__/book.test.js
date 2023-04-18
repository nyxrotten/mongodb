const Book = require('../book');
const Genre = require('../genre');

describe('Book model', () => {
	test('genre is required and must be associated by ObjectId', async () => {
		expect.assertions(2);
		try {
			await Book.create({
				title: 'Microsoft Office Essentials 2',
				isbn: '193398869X',
				status: 'PUBLISH',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}

		try {
			await Book.create({
				title: 'Microsoft Office Essentials 2',
				isbn: '193398869X',
				status: 'PUBLISH',
				published: true,
				genre: 'test',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('genre must ref genre collection', async () => {
		const genre = await Genre.create({
			name: 'Crime',
		});

		const book = await Book.create({
			title: 'Microsoft Office Essentials 2',
			isbn: '193398869X',
			status: 'PUBLISH',
			genre: genre.id,
		});

		const populatedBook = await book.populate('genre');
		expect(populatedBook.genre.name).toBe(genre.name);
	});
});
