const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({

    title: {
        type: String, 
        required: true
    },
    isbn10: {
        type: String,
        required: false
    },
    isbn13: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Book', bookSchema);