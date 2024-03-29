import { PrismaClient } from "@prisma/client"
import { Telephone } from "../model/User"
import UseCase from "../shared/UseCase"
import { hash } from "bcrypt"
import { Output } from "../utils/output"
import { Status } from "../../Error/Model/error"

type Input = {
  name: string
  email: string
  password: string
  telephone: Telephone[]
}

export class RegisterUser implements UseCase<Input, Output | Status> {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async execute(data: Input): Promise<Output | Status> {
    try {
      const { name, email, password, telephone } = data
      if (!email) {
        return { message: "email is required", status: "error" }
      }

      const emailAlready = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      })

      if (emailAlready) {
        return { message: "email already exist", status: "error" }
      }

      const hashPassword = await hash(password, 8)

      const user = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
          telephone: {
            create: telephone.map((phone) => ({
              ddd: phone.ddd,
              phone: phone.phone,
            })),
          },
        },
      })

      return {
        id: user.id,
        createdAt: user.createdAt,
        updateAt: user.updateAt,
      }
    } catch (error) {
      console.log(error)
      return { status: "error", message: `error is ${error}` }
    }
  }
}
