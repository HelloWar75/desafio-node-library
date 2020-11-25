const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const corsPolicy = require('./middleware/cors');

/*
 * Inicia o express
 */
const app = express();

/*
 * Conecta ao banco MongoDB
 */
mongoose.connect('mongodb://127.0.0.1:27017/test?retryWrites=true&w=majority')
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Unable to connecto to MongoDB!');
        console.error(error);
    });

/*
 * Definir porta do express
 */
const PORT = process.env.PORT || 3000;

/*
 * Configuração de middlewares para o express
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(corsPolicy);

/*
 * Rota padrão sem necessidade de autenticação
 */
app.get('/', (req, res) => {
    response.status(200).send('API is Working!');
});

/*
 * Playground de testes!
 */ 
const userResource = require('./resources/userResource');
app.use('/users', userResource);

/*
 * Roda o express
 */
app.listen(PORT, () => {
    console.log('API is Online!');
});