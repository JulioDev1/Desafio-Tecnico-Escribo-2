import express from "express";
import RepositoryPrismaSl from "./external/prisma/RepositoryPrismaSl";
import { RegisterUser } from "./core/User/Service/SignUpUser";
import UserController from "./adpaters/RegisterController";

const app = express();
const port = 3000;

const repositoryUser = new RepositoryPrismaSl();
const registerUser = new RegisterUser(repositoryUser);

new UserController(app, registerUser).handleCreate;

app.listen(port, () => {
  console.log(`server isrunning in port now ${port}`);
});
