import { PrismaClient } from "@prisma/client";
import { Status } from "../../Error/Model/error";
import UseCase from "../shared/UseCase";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

type Input = {
  email: string;
  password: string;
};
type Output = {
  token: string;
};

export class LoginUser implements UseCase<Input, Output | Status> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(input: Input): Promise<Output | Status> {
    const { email, password } = input;

    const emailSearch = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!emailSearch) {
      return { message: "user or password incorrect", status: "error" };
    }

    const passwordMatch = await compare(password, emailSearch.password);

    if (!passwordMatch) {
      return { message: "user or password incorrect", status: "error" };
    }

    const token = await jwt.sign({}, process.env.UUID ?? "", {
      subject: emailSearch.id,
      expiresIn: "30min",
    });

    return { token };
  }
}
