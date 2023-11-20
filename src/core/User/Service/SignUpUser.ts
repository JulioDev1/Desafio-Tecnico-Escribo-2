import UseCase from "../shared/UseCase";

type Input = {
  name: string;
  email: string;
  password: string;
  telephone: [{ dd: string; phone: string }];
};

export class RegisterUser implements UseCase<Input, void> {
  execute(input: Input): Promise<void> {}
}
