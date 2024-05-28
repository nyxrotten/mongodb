const mongoose = require('mongoose')
const Book = require('./src/book')

const db = 'practice-mongodb'
const url = 'mongodb://127.0.0.1:27017/'

const main = async () => {
	try {
		await mongoose.connect(url + db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('Connected to MongoDB')
	} catch (err) {
		console.error('Error connecting to MongoDB:', err)
	}
}

beforeAll(async () => {
	await main()
})

afterAll(async () => {
	try {
		await mongoose.connection.close()
		console.log('MongoDB connection closed')
	} catch (err) {
		console.error('Error closing MongoDB connection:', err)
	}
})

beforeEach(async () => {
	try {
		await Book.deleteMany({})
	} catch (err) {
		console.error('Error deleting books:', err)
	}
})

afterEach(async () => {
	try {
		await Book.deleteMany({})
	} catch (err) {
		console.error('Error deleting books:', err)
	}
})
