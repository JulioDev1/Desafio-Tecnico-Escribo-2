export type Telephone = {
  ddd: string;
  phone: string;
};

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  telephone: Telephone;
  createdAt?: Date;
  UpdatedAt?: Date;
}
