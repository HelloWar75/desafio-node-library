const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const favoriteSchema = mongoose.Schema({

    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('favorite', favoriteSchema);