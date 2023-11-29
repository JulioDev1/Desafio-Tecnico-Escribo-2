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
- **Eslint**: adicionar padrões de escritar ao codigo
- **Prettier**: para adicionar padrão de indentação de codigo
- **Jest**: para testes da aplicação
- **Bcrypt**: para criptografia de senha
- **tsx** : para execução moderna do codigo
- tsup: transpila o codigo de typescript para javascript 
