# Desafio-Tecnico-Escribo-2

## Deploy Feito via Google Cloud
Para acesso da aplicação para testes o link da vm alocada no google cloud é http://34.125.235.204:3000/create 
para criar usuario e para login http://34.125.235.204:3000/authenticate, eu recomendo testar pelo postman para compilar testar rotas da api 

um exemplo de input na rota create:
```json
{
 "name" : "anymail",
 "email" : "teste@gmail.com",
 "password" : "Hesoyam20@",
 "telephone" : [{ "ddd": "61", "phone" : "316245" }]
}
```
um exemplo de teste na rota authenticate:
```json
{"email":"anyname@mail.com", "password":"anypassword"}
```


O código foi feito utilizando o gerenciador de pacotes **Yarn**.

Para baixar todas as dependências, execute o seguinte comando no terminal:
```bash
   yarn install
````
então para rodar o codigo  execute o comando:
```bash
   yarn start
````
para verificar os teste feito pelo jest:
```bash
   yarn test:watch
````

**Requisitos e tecnologias da aplicação**

- **Typescript**: adicionar tipagem e os tipos dados serem mais preciso em seus tipos
- **NodeJs**: Run time usada para compilar o codigo
- **Express**: executar as rotas e requisições
- **eslint**: adicionar padrões ao codigo
- **prettier**: para adicionar padrão de indentação de codigo
- **jest**: para testes da apliocação
- **bcrypt**: para criptografia de senha
