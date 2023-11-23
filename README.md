# Desafio-Tecnico-Escribo-2
Para acesso da aplicação para testes o link da vm alocada no google cloud é http://34.125.235.204:3000/create 
para criar usuario e para login http://34.125.235.204:3000/authenticate, eu recomendo testar pelo postman para compilar testar rotas da api 

um exemplo de input na rota create:

{"name" : "anymail",
 "email" : "teste@gmail.com",
 "password" : "Hesoyam20@",
 "telephone" : [{ "ddd": "61", "phone" : "316245" }]
}

um exemplo de teste na rota authenticate:

{"email":"anyname@mail.com", "password":"anypassword"}


o código foi feito pelo gerenciado de pacotes yarn, 

então para baixar todas as dependências  necessário dar yarn install

yarn start para rodar a aplicação

yarn watch para ver os teste rodando na aplicação(feitos pelo jest)

há outros comandos básicos mas esses são os mais importante
