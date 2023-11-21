import { User } from "../model/User";

export default interface RepositoryUser {
  findByEmail(email: string): Promise<User | null>;
  createAccount(user: User): Promise<User>;
}
