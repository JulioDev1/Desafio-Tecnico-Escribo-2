import { Telephone } from "../model/User";
import UseCase from "../shared/UseCase";
import RepositoryUser from "./RepositoryUser";

type Input = {
  name: string;
  email: string;
  password: string;
  telephone: Telephone;
};

export class RegisterUser implements UseCase<Input, Status> {
  constructor(private readonly repository: RepositoryUser) {}

  async execute(data: Input): Promise<Status> {
    const { name, email, password, telephone } = data;
    const numberExist = await this.repository.findByNumber(telephone);

    if (numberExist) {
      return { message: "number already use", status: "error" };
    }

    const emailAlready = await this.repository.findByEmail(email);

    if (emailAlready) {
      return { message: "email already exist", status: "error" };
    }

    const newUser = await this.repository.create({
      name,
      email,
      password,
      telephone,
    });

    return { message: `welcome user : ${newUser}`, status: "sucess" };
  }
}
