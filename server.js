const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const corsPolicy = require('./middleware/cors');
const authMiddleware = require('./middleware/auth');
/*
 * Inicia o express
 */
const app = express();

/*
 * Conecta ao banco MongoDB
 */
mongoose.connect('mongodb+srv://admin:12592075@cluster0.vcn5p.mongodb.net/teste?retryWrites=true&w=majority')
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
const authResource = require('./resources/authResource');
const userResource = require('./resources/userResource');
const bookResource = require('./resources/bookResource');
const favoriteResource = require('./resources/favoriteResource');
app.use('/auth', authResource);
app.use('/users', authMiddleware, userResource);
app.use('/books', authMiddleware, bookResource);
app.use('/favorites', authMiddleware, favoriteResource);


/*
 * Roda o express
 */
app.listen(PORT, () => {
    console.log('API is Online!');
});