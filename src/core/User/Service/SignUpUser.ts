import { PrismaClient } from "@prisma/client";
import { Telephone, User } from "../model/User";
import UseCase from "../shared/UseCase";
import RepositoryUser from "./RepositoryUser";

type Input = {
  name: string;
  email: string;
  password: string;
};

export class RegisterUser implements UseCase<Input, User | Status> {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(data: Input): Promise<User | Status> {
    try {
      const { name, email, password } = data;
      const emailAlready = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (emailAlready) {
        return { message: "email already exist", status: "error" };
      }
      console.log(data);

      const user = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return { status: "error", message: `error is ${error}` };
    }
  }
}
