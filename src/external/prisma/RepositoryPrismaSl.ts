import { PrismaClient } from "@prisma/client";
import RepositoryUser from "../../core/User/Service/RepositoryUser";
import { User } from "../../core/User/model/User";

export default class RepositoryPrismaSl implements RepositoryUser {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  create(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
}
