const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bookService = require('../services/bookService');

/*
 * Listar todos usuários, mas não podemos esquecer da paginação! (só um lembrete)
 */
router.get('/all/:page?', async (req, res) => {
    
    let pageNumber = 0;
    let recordsLimit = 5;

    if( req.params.page > 0 )
        pageNumber = req.params.page
    
    let skip = 0;

    if( pageNumber > 0 )
        skip = recordsLimit * ( pageNumber - 1 );

    
    let allbooks = null;
    
    try {
        allbooks = await bookService.findAll(skip, recordsLimit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    return res.status(200).json({
        data: allbooks,
    });

});

router.get('/:id', async (req, res) => {

    if( !req.params.id )
        return res.status(500).json({
            error: 'Parameter Id is required!'
        });
    
    console.log(req.params.id);

    let book = null;

    try {
        book = await bookService.findById(req.params.id);
    } catch (error) {
        return res.status(404).json({
            error: 'book not found!'
        });
    }

    if( book == null )
        return res.status(404).json({
            error: 'book not found!'
        });

    return res.status(200).json({
        data: book
    });

});
//rota de update de usuario
router.put('/:id', async (req, res) => {

    if( !req.params.id )
        return res.status(500).json({
            error: 'Parameter Id is required!'
        });
    
    if( !req.body )
        return res.status(500).json({
            error: 'Body is necessary!'
        });

    let book = null;

    try {
        book = await bookService.findById(req.params.id);
    } catch (error) {
        return res.status(404).json({
            error: 'book not found!'
        });
    }
    
    if( book == null )
        return res.status(404).json({
            error: 'book not found!'
        });

    try {
        await bookService.update(req.params.id, req.body);
    } catch (error) {
        return res.status(500).json({
            error: 'Error in update book!'
        });
    }

    return res.status(200).json({
        message: "book updated!"
    });

});

router.post('/', async (req, res) => {

    /* 
     * Checando se existem campos que não foram passados
     */ 
    if( !req.body.title )
        return res.status(400).json({
            error: 'Title cannot be null'
        });
    
    if( !req.body.isbn10 || !req.body.isbn13 )
        return res.status(400).json({
            error: 'ISBN-10 or ISBN-13 cannot be null'
        });

    if( !req.body.category )
        return res.status(400).json({
            error: 'Category cannot be null'
        });
    
    if( !req.body.year )
        return res.status(400).json({
            error: 'Year cannot be null'
        });

    
    try {
        await bookService.create(req.body);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    return res.status(200).json({
        message: 'book created!'
    });

});

router.delete('/:id', async (req, res) => {

    if( !req.params.id )
        return res.status(500).json({
            error: 'Parameter Id is required!'
        });
    
        let book = null;

    try {
        book = await bookService.findById(req.params.id);
    } catch (error) {
        return res.status(404).json({
            error: 'book not found!'
        });
    }
        
    if( book == null )
        return res.status(404).json({
            error: 'book not found!'
        });

    try {
        await bookService.delete(req.params.id);
    } catch (error) {
        return res.status(500).json({
            error: 'Error in delete book!'
        });
    }

    return res.status(200).json({
        message: "book deleted!"
    });

});

module.exports = router;