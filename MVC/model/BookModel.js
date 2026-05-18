const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    BookName: {
        type: String
    },
    BookAuthor: {
        type: String
    }
})

const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel