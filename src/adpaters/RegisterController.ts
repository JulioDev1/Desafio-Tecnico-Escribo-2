import { Express, Request, Response, response } from "express";
import { RegisterUser } from "../core/User/Service/SignUpUser";

export default class UserController {
  constructor(readonly server: Express, readonly registerUser: RegisterUser) {
    this.server.post("/create", this.handleCreate.bind(this));
  }
  handleCreate(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        password,
        telephone: { ddd, phone },
      } = request.body;

      const newUser = this.registerUser.execute({
        name,
        email,
        password,
        telephone: { ddd: ddd, phone: phone },
      });

      return response.json({
        user: newUser,
      });
    } catch (error) {
      response.json(error);
    }
  }
}
