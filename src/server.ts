import express from "express";
import { RegisterUser } from "./core/User/Service/SignUpUser";
import UserController from "./adpaters/RegisterController";

const app = express();
const port = 3000;
app.use(express);

const registerUser = new RegisterUser();
const userController = new UserController(registerUser);

app.post("/create", (request, response) =>
  userController.createAccountController(request, response)
);

app.listen(port, () => {
  console.log(`server isrunning in port now ${port}`);
});
