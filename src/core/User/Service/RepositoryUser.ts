import { Telephone, User } from "../model/User";

export default interface RepositoryUser {
  findByNumber(number: Telephone): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
