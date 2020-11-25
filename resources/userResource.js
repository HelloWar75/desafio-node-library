const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const user = require('../models/user');

const emailRegex = /\S+@\S+/;

router.post('/singup', async (req, res) => {

    /* 
     * Vai ser passado name, age, phone, email, password
     */ 
    if( !req.body.name )
        res.status(400).json({
            error: 'Name cannot be null'
        });
    
    if( !req.body.age )
        res.status(400).json({
            error: 'Age cannot be null'
        });

    if( !req.body.phone )
        res.status(400).json({
            error: 'Phone cannot be null'
        });
    
    if( !req.body.email )
        res.status(400).json({
            error: 'Email cannot be null'
        });
    
    if( !emailRegex.test(String(req.body.email).toLocaleLowerCase()) )
        res.status(400).json({
            error: 'Email is invalid!'
        });

    if( !req.body.password )
        res.status(400).json({
            error: 'Password cannot be null'
        });

    /*
     * Gerar senha com bcrypt
     */ 
    try {
        let encryptedPassword = await bcrypt.hash(req.body.password, 10);
    } catch (error) {
        console.error(error);
        res.status(500).json({
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
        res.status(500).json({
            error: error
        });
    }

    res.status(200).json({
        message: 'User created!'
    });
    
});



module.exports = router;