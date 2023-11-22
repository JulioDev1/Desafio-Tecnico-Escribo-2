import { Request, Response } from "express";
import { LoginUser } from "../core/User/Service/LoginUser";

export default class AuthController {
  async authAccountController(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticate = new LoginUser();
    const token = await authenticate.execute({ email, password });

    return response.json(token);
  }
}
