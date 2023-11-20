import { Express, Request, Response } from "express";
import { RegisterUser } from "../core/User/Service/SignUpUser";

export default class UserController {
  constructor(readonly server: Express, readonly registerUser: RegisterUser) {}

  register(request: Request, response: Response) {
    const { body } = request;
    const {
      name,
      email,
      password,
      telephone: { ddd, phone },
    } = body;

    const newUser = this.registerUser.execute({
      name,
      email,
      password,
      telephone: { ddd, phone },
    });
    return response.json({ message: `user ${newUser} registered with sucess` });
  }
}
