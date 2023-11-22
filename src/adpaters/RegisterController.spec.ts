/* eslint-disable @typescript-eslint/no-explicit-any */

import request from "supertest"
import express from "express"

const app = express()
describe("register", () => {
  test("should be return erro because password is null", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        name: "anyName",
        email: "anymail17@mail.com.br",
        telephone: [{ ddd: "11", phone: "55555555" }],
      })

    expect(response.statusCode).toBe(404)
  })
  test("should be return erro because email is null", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        name: "anyName",
        password: "anypassword",
        telephone: [{ ddd: "11", phone: "55555555" }],
      })

    expect(response.statusCode).toBe(404)
  })
  test("should be return erro because name is null", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        email: "anymail17@mail.com.br",
        password: "anypassword",
        telephone: [{ ddd: "11", phone: "55555555" }],
      })

    expect(response.statusCode).toBe(404)
  })
  test("should be return error because telephone is null", async () => {
    const response = await request(app).post("/create").send({
      name: "anyName",
      email: "anymail17@mail.com.br",
      password: "anypassword",
    })

    expect(response.statusCode).toBe(404)
  })
  test("should be return error because email already register", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        name: "anyName",
        email: "anymail@mail.com.br",
        password: "anypassword",
        telephone: [{ ddd: "11", phone: "55555555" }],
      })

    expect(response.statusCode).toBe(404)
  })
})
