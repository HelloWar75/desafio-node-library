const express = require('express');
const router = express.Router();
const favoriteService = require('../services/favoriteService');
const userService = require('../services/userService');
const bookService = require('../services/bookService');

router.get('/all/:page?', async (req, res) => {
    
    let pageNumber = 0;
    let recordsLimit = 5;

    if( req.params.page > 0 )
        pageNumber = req.params.page
    
    let skip = 0;

    if( pageNumber > 0 )
        skip = recordsLimit * ( pageNumber - 1 );

    
    let allFavorites = null;
    
    try {
        allUsers = await favoriteService.findAll(skip, recordsLimit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    return res.status(200).json({
        data: allUsers,
    });

});

router.get('/all/by/user/:uid/:page?', async (req, res) => {
    
    let pageNumber = 0;
    let recordsLimit = 5;

    if( !req.params.uid )
        return res.status(500).json({
            error: 'User Id is required!'
        });

    if( req.params.page > 0 )
        pageNumber = req.params.page
    
    let skip = 0;

    if( pageNumber > 0 )
        skip = recordsLimit * ( pageNumber - 1 );

    
    let allFavorites = null;
    
    try {
        allUsers = await favoriteService.findAllByUserId(skip, recordsLimit, req.params.uid);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    return res.status(200).json({
        data: allUsers,
    });

});

router.post('/', async (req, res) => {

    if( !req.body.bookId )
        return res.status(400).json({
            error: 'Book ID cannot be null'
        });

    if( !req.body.userId )
        return res.status(400).json({
            error: 'User ID cannot be null'
        });
    
    let user = null;

    try {
        user = await userService.findById(req.body.userId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    if( user == null )
        return res.status(404).json({
            error: 'User not found!'
        });

    let book = null;

    try {
        book = await bookService.findById(req.body.bookId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }
    
    if( book == null )
        return res.status(404).json({
            error: 'Book not found!'
        });
    
    // adicionar verificação se o livro já foi favoritado

    let favorite_exist = null;
    
    try {
        favorite_exist = await favoriteService.findOne(req.body);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    if( favorite_exist != null )
        return res.status(404).json({
            error: 'Favorite already exists!'
        });

    try {
        await favoriteService.create(req.body);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    return res.status(200).json({
        message: 'Favorite added!'
    });
    
});

router.delete('/:fid', async (req, res) => {

    if( !req.params.fid )
        return res.status(500).json({
            error: 'Favorite Id is required!'
        });
    
    let favorite = null;

    try {
        favorite = await favoriteService.findById(req.params.fid);
    } catch (error) {
        return res.status(404).json({
            error: 'Favorite not found!'
        });
    }
        
    if( favorite == null )
        return res.status(404).json({
            error: 'Favorite not found!'
        });

    try {
        await favoriteService.delete(req.params.fid);
    } catch (error) {
        return res.status(500).json({
            error: 'Error in delete favorite!'
        });
    }

    return res.status(200).json({
        message: "Favorite deleted!"
    });

});

module.exports = router;