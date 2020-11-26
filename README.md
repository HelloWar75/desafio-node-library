# Desafio nodejs (desafio-node-library)

### Testando rotas do projeto no Postman

 1. Primeiramente importar o desafio.postman-collection.json em seu Postman.
 2. Verá que as rotas estão nomeadas cada uma com sua função específica.
 3. Para testar primeiramente é preciso alterar os dados na rota Auth -> Singup Route para os dados desejados para o cadastro [ name, age, phone, email, password ]
 4. Após ter efetuado seu cadastro, é necessário efetuar o login no sistema com a rota Auth -> Singing Route enviando o email cadastrado e a senha escolhida.
 5. Copie o token que é retornado após o login e coloque na aba Authorization selecionando a opção Bearer Token
 6. Após todos passos anteriores concluídos você terá acesso a todas demais rotas que necessitam de autenticação

### Grupo de rotas que necessitam autorização para utilizar

 - /users
 - /books
 - /favorites
 
 ---
### Executando os testes unitários
1.  Faça download do repositório do projeto.
2.  Execute o comando 'npm install' para instalar todas dependências do projeto.
3.  Neste projeto foi utilizado o framework de testes unitários Mocha.
4.  Na mesma pasta do projeto após a instalação do mesmo é necessário digitar 'npm run test'.
5.  Será executado 24 testes unitários que devem retornar sucesso.
