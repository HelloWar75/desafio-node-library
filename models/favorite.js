const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const favoriteSchema = mongoose.Schema({

    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('favorite', favoriteSchema);