import { PrismaClient } from "@prisma/client"
import UseCase from "../shared/UseCase"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { Output } from "../utils/output"
import { Status } from "../../Error/Model/error"

type Input = {
  email: string
  password: string
}

export class LoginUser implements UseCase<Input, Output | Status> {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async execute(input: Input): Promise<Output | Status> {
    const { email, password } = input

    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      return { message: "user or password incorrect", status: "error" }
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return { message: "user or password incorrect", status: "error" }
    }

    if (user && passwordMatch) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      })
    }

    const token = await jwt.sign({}, process.env.UUID ?? "", {
      subject: user.id,
      expiresIn: "30min",
    })

    return {
      token: token,
      id: user.id,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
      lastLogin: user.lastLogin,
    }
  }
}
