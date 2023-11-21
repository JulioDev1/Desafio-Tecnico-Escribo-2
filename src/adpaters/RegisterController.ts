import { Request, Response } from "express";
import { RegisterUser } from "../core/User/Service/SignUpUser";

export default class UserController {
  constructor(readonly registerUser: RegisterUser) {}
  async createAccountController(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const newUser = await this.registerUser.execute({
        name,
        email,
        password,
      });

      return response.json(201).json(newUser);
    } catch (error) {
      response.status(500).json("error in server");
    }
  }
}
