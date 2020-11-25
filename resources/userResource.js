const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const emailRegex = /\S+@\S+/;

/*
 * Listar todos usuários, mas não podemos esquecer da paginação! (só um lembrete)
 */
router.get('/:page?', async (req, res) => {
    
    let pageNumber = 0;
    let recordsLimit = 5;

    if( req.params.page > 0 )
        pageNumber = req.params.page
    
    let skip = 0;

    if( pageNumber > 0 )
        skip = recordsLimit * ( pageNumber - 1 );

    
    let allUsers = null;
    
    try {
        allUsers = await userService.findAll(skip, recordsLimit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    res.status(200).json({
        data: allUsers,
    });

});

module.exports = router;