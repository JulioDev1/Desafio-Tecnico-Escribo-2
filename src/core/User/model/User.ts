export interface Telephone {
  id?: string
  ddd: string
  phone: string
}

export interface User {
  id?: string
  name: string
  email: string
  password: string
  telephone: Telephone[]
  createdAt?: Date
  UpdatedAt?: Date
}
