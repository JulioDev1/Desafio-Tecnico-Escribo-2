import { Request, Response } from "express";
import { RegisterUser } from "../core/User/Service/RegisterUser";

export default class RegisterController {
  async createAccountController(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const registerUser = new RegisterUser();

      const user = await registerUser.execute({
        name,
        email,
        password,
      });

      return response.json(user);
    } catch (error) {
      response.status(500).json("error in server");
    }
  }
}
