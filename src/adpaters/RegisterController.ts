import { Request, Response } from "express";
import { RegisterUser } from "../core/User/Service/RegisterUser";

export default class RegisterController {
  async createAccountController(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        password,
        telephone: [{ ddd, phone }],
      } = request.body;
      const registerUser = new RegisterUser();

      const user = await registerUser.execute({
        name,
        email,
        password,
        telephone: [{ ddd: ddd, phone: phone }],
      });

      return response.json(user);
    } catch (error) {
      response.status(500).json("error in server");
    }
  }
}
