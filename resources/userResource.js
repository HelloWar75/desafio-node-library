const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const emailRegex = /\S+@\S+/;

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

    
    let allUsers = null;
    
    try {
        allUsers = await userService.findAll(skip, recordsLimit);
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

router.get('/:id', async (req, res) => {

    if( !req.params.id )
        return res.status(500).json({
            error: 'Parameter Id is required!'
        });
    
    console.log(req.params.id);

    let user = null;

    try {
        user = await userService.findById(req.params.id);
    } catch (error) {
        return res.status(404).json({
            error: 'User not found!'
        });
    }

    if( user == null )
        return res.status(404).json({
            error: 'User not found!'
        });

    return res.status(200).json({
        data: user
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

    let user = null;

    try {
        user = await userService.findById(req.params.id);
    } catch (error) {
        return res.status(404).json({
            error: 'User not found!'
        });
    }
    
    if( user == null )
        return res.status(404).json({
            error: 'User not found!'
        });

    try {
        await userService.update(req.params.id, req.body);
    } catch (error) {
        return res.status(500).json({
            error: 'Error in update user!'
        });
    }

    return res.status(200).json({
        message: "User updated!"
    });

});

router.post('/', async (req, res) => {

    /* 
     * Checando se existem campos que não foram passados
     */ 
    if( !req.body.name )
        return res.status(400).json({
            error: 'Name cannot be null'
        });
    
    if( !req.body.age )
        return res.status(400).json({
            error: 'Age cannot be null'
        });

    if( !req.body.phone )
        return res.status(400).json({
            error: 'Phone cannot be null'
        });
    
    if( !req.body.email )
        return res.status(400).json({
            error: 'Email cannot be null'
        });
    
    if( !emailRegex.test(String(req.body.email).toLocaleLowerCase()) )
        return res.status(400).json({
            error: 'Email is invalid!'
        });

    if( !req.body.password )
        return res.status(400).json({
            error: 'Password cannot be null'
        });

    /*
     * Gerar senha com bcrypt
     */ 
    let encryptedPassword = "";
    try {
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    let remountedJson = {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email,
        password: encryptedPassword
    }

    try {
        await userService.create(remountedJson);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error
        });
    }

    return res.status(200).json({
        message: 'User created!'
    });

});

router.delete('/:id', async (req, res) => {

    if( !req.params.id )
        return res.status(500).json({
            error: 'Parameter Id is required!'
        });
    
        let user = null;

    try {
        user = await userService.findById(req.params.id);
    } catch (error) {
        return res.status(404).json({
            error: 'User not found!'
        });
    }
        
    if( user == null )
        return res.status(404).json({
            error: 'User not found!'
        });

    try {
        await userService.delete(req.params.id);
    } catch (error) {
        return res.status(500).json({
            error: 'Error in delete user!'
        });
    }

    return res.status(200).json({
        message: "User deleted!"
    });

});


module.exports = router;