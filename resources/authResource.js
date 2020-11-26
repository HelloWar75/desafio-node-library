const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const emailRegex = /\S+@\S+/;

router.post('/singup', async (req, res) => {

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

router.post('/singin', async (req, res) => {

    /*
     * Checando se existem campos que não foram passados
     */
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
    
    let user = null;

    try {
        user = await userService.findByEmail(req.body.email);
    } catch (error) {
        return res.status(401).json({
            error: 'User not found!'
        });
    }

    if( user == null )
        return res.status(401).json({
            error: 'User not found!'
        });

    if( !bcrypt.compareSync(req.body.password, user.password) )
        return res.status(401).json({
            error: 'Incorrect password!'
        });
    
    let token = jwt.sign({ userId: user._id }, '1y72e81gey781g8414y143', { expiresIn: '24h' });

    try {
        user.token = token;
        await userService.update(user._id, user);
    } catch (error) {
        return res.status(401).json({
            error: 'Error in save token!'
        });
    }

    res.status(200).json({
        userId: user._id,
        token: token
    });

});

module.exports = router;