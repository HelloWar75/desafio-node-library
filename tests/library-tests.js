const chai = require('chai');
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

let should = chai.should();

chai.use(http);
chai.use(subSet);

let url = 'http://localhost:3000';

let token1 = "";
let token2 = "";

let user1 = {
    name: "Usuario 1",
    age: "20",
    phone: "55519805333001",
    email: "luisjustin72@gmail.com",
    password: "12592075"
}

let user2 = {
    name: "Usuario 2",
    age: "25",
    phone: "55519805333221",
    email: "luisjustin7123@gmail.com",
    password: "12502076"
}

let user1_id = "";
let user2_id = "";

let book1 = {
    "title": "Livro 1",
    "isbn10": "378195734895662",
    "isbn13": "2347821974781455",
    "category": "Normal",
    "year": "2020"
}

let book2 = {
    "title": "Livro 2",
    "isbn10": "37819595662",
    "isbn13": "2347824781455",
    "category": "Anormal",
    "year": "2021"
}

let book1_id = "";
let book2_id = "";

let favorite1_id = "";
let favorite2_id = "";

/*
 * Teste rotas de autenticação.
 */

describe('/POST auth/singup/', function() {
    
    it('First user created', (done) => {

        chai.request(url)
            .post('/auth/singup')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Second user created', (done) => {

        chai.request(url)
            .post('/auth/singup')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    
});

describe('/POST auth/singin/', function() {
    
    it('Login First User', (done) => {

        chai.request(url)
            .post('/auth/singin')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                token1 = res.body.token;
                user1_id = res.body.userId;
                done();
            });
    });

    it('Login Second User', (done) => {

        chai.request(url)
            .post('/auth/singin')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(200);
                token2 = res.body.token;
                user2_id = res.body.userId;
                done();
            });
    });
    
});

/*
 * Teste rotas de livros GET, POST e PUT
 */
describe('/GET books/all/', function() {
    
    it('Should have 0 books', (done) => {

        chai.request(url)
            .get('/books/all/')
            .set('Authorization', 'Bearer ' + token1)
            .end((err, res) => {

                res.should.have.status(200);
                res.body.data.should.have.lengthOf(0);

                done();
            });
    });
    
});

describe('/POST books/', function() {
    
    it('Create First Book', (done) => {

        chai.request(url)
            .post('/books')
            .set('Authorization', 'Bearer ' + token1)
            .send(book1)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Create Second Book', (done) => {

        chai.request(url)
            .post('/books')
            .set('Authorization', 'Bearer ' + token2)
            .send(book2)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    
});

describe('/GET books/all/', function() {
    
    it('Should have 2 books', (done) => {

        chai.request(url)
            .get('/books/all/')
            .set('Authorization', 'Bearer ' + token1)
            .end((err, res) => {

                let count = 0;
                let data = res.body.data;

                data.forEach(element => {
                    if( count == 0 )
                        book1_id = element._id;
                    
                    if( count == 1 )
                        book2_id = element._id;

                    count++;
                });

                res.should.have.status(200);
                res.body.data.should.have.lengthOf(2);

                done();
            });
    });
    
});

describe('/PUT books/:id', function() {

    it('Update First Book', (done) => {

        chai.request(url)
            .put('/books/' + book1_id)
            .set('Authorization', 'Bearer ' + token1)
            .send({ title: "Novo Nome Livro 1" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Update Second Book', (done) => {

        chai.request(url)
            .put('/books/' + book2_id)
            .set('Authorization', 'Bearer ' + token2)
            .send({ title: "Novo Nome Livro 2" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});

/*
 * Teste rotas de usuarios GET e PUT
 */

describe('/GET users/all/', function() {
    
    it('Should return 2 users', (done) => {

        chai.request(url)
            .get('/users/all')
            .set('Authorization', 'Bearer ' + token1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.have.lengthOf(2);
                done();
            });
    });
    
});

describe('/PUT users/:id', function() {

    it('Update First User', (done) => {

        chai.request(url)
            .put('/users/' + user1_id)
            .set('Authorization', 'Bearer ' + token1)
            .send({ name: "Novo Nome Usuario 1" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Update Second Book', (done) => {

        chai.request(url)
            .put('/users/' + user2_id)
            .set('Authorization', 'Bearer ' + token2)
            .send({ name: "Novo Nome Usuario 2" })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});

/*
 * Teste rotas de favoritos GET, POST e DELETE
 */

describe('/GET favorites/all/', function() {
    
    it('Should have 0 favorites', (done) => {

        chai.request(url)
            .get('/favorites/all')
            .set('Authorization', 'Bearer ' + token1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.have.lengthOf(0);
                done();
            });
    });
    
});

describe('/POST favorites/', function() {
    
    it('Add First book to user 1 favorite', (done) => {

        chai.request(url)
            .post('/favorites')
            .set('Authorization', 'Bearer ' + token1)
            .send({
                userId: user1_id,
                bookId: book1_id
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Add Second book to user 2 favorite', (done) => {

        chai.request(url)
            .post('/favorites')
            .set('Authorization', 'Bearer ' + token2)
            .send({
                userId: user2_id,
                bookId: book2_id
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    
});

describe('/GET favorites/all/by/user/:id', function() {
    
    it('Should have 1 favorite for user 1', (done) => {

        chai.request(url)
            .get('/favorites/all/by/user/' + user1_id)
            .set('Authorization', 'Bearer ' + token1)
            .end((err, res) => {
                res.should.have.status(200);
                favorite1_id = res.body.data[0]._id;
                res.body.data.should.have.lengthOf(1);
                done();
            });
    });

    it('Should have 1 favorite for user 2', (done) => {

        chai.request(url)
            .get('/favorites/all/by/user/' + user2_id)
            .set('Authorization', 'Bearer ' + token2)
            .end((err, res) => {
                res.should.have.status(200);
                favorite2_id = res.body.data[0]._id;
                res.body.data.should.have.lengthOf(1);
                done();
            });
    });
    
});

describe('/DELETE favorites/:id', function() {

    it('Deleting First Favorite', (done) => {

        chai.request(url)
            .delete('/favorites/' + favorite1_id)
            .set('Authorization', 'Bearer ' + token1)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Deleting Second Favorite', (done) => {

        chai.request(url)
            .delete('/favorites/' + favorite2_id)
            .set('Authorization', 'Bearer ' + token1)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});

/*
 * DELETAR TUDO!
 */
describe('/DELETE books/:id', function() {

    it('Deleting First Book', (done) => {

        chai.request(url)
            .delete('/books/' + book1_id)
            .set('Authorization', 'Bearer ' + token1)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Deleting Second Book', (done) => {

        chai.request(url)
            .delete('/books/' + book2_id)
            .set('Authorization', 'Bearer ' + token1)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});

describe('/DELETE users/:id', function() {

    it('Deleting First User', (done) => {

        chai.request(url)
            .delete('/users/' + user1_id)
            .set('Authorization', 'Bearer ' + token1)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Deleting Second User', (done) => {

        chai.request(url)
            .delete('/users/' + user2_id)
            .set('Authorization', 'Bearer ' + token2)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});
