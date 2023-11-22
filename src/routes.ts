import { Router } from "express";
import RegisterController from "./adpaters/RegisterController";
import AuthController from "./adpaters/AuthController";

const router = Router();

const registerController = new RegisterController();
const loginController = new AuthController();

router.post("/create", registerController.createAccountController);
router.post("/authenticate", loginController.authAccountController);

router.get("/get-user", (request, response) => {
  response.json([
    { id: 1, name: "teste" },
    { id: 2, name: "acess route" },
  ]);
});

export { router };
