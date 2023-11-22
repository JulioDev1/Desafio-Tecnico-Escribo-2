import { Request, Response, Router } from "express"
import RegisterController from "./adpaters/RegisterController"
import AuthController from "./adpaters/AuthController"
import { AuthMiddleware } from "./Middleware/Authmiddleware"

const router = Router()

const registerController = new RegisterController()
const loginController = new AuthController()

router.post("/create", registerController.createAccountController)
router.post("/authenticate", loginController.authAccountController)
router.get("/", (request: Request, response: Response) => {
  response.status(200).send("Funcionando!")
})
router.get("/get-user", AuthMiddleware, (request, response) => {
  response.json([
    { id: 1, name: "teste" },
    { id: 2, name: "acess route" },
  ])
})

export { router }
