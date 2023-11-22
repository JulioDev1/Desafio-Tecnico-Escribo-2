import request from "supertest"
import { app } from "../app"

describe("AuthController", () => {
  test("incorrectly password or email", async () => {
    const response = await request(app).post("/authenticate").send({
      email: "anymail@mail.com.br",
      password: "111111",
    })

    expect(response.statusCode).toBe(200)
  })
  test("login with sucess", async () => {
    const response = await request(app).post("/authenticate").send({
      email: "anymail2@mail.com.br",
      password: "anypassword",
    })

    expect(response.statusCode).toBe(200)
  })
  test("input field null", async () => {
    const response = await request(app).post("/authenticate").send({
      email: "anymail2@mail.com.br",
    })

    expect(response.statusCode).toBe(500)
  })
})
