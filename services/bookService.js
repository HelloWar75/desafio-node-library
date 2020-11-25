const book = require('../models/book');

const bookService = {

    create: async (bookJson) => {
        const bookTmp = book.create(bookJson);
        return bookTmp;
    },

    findById: async ( id ) => {
        const bookTmp = await book.findOne({ _id: id });
        return bookTmp;
    },

    update: async ( id, bookJson ) => {
        const updatedBook = await book.updateOne({ _id: id }, bookJson);
        return updatedBook;
    },

    delete: async ( id ) => {
        const deletedBook = await book.deleteOne({ _id: id });
        
        if( deletedBook.deletedCount < 1 )
            return {
                error: 'Book not found!'
            };

        return deletedBook;
    },

    findOne: async ( queryJson ) => {
        const findOneBook = await book.findOne(queryJson);
        return findOneBook;
    },

    findByEsbn13: async ( isbn ) => {
        const bookTmp = await book.findOne({ isbn13: isbn });
        return bookTmp;
    }

};

module.exports = bookService;