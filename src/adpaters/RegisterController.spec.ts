/* eslint-disable @typescript-eslint/no-explicit-any */

import request from "supertest"
import express from "express"

const app = express()
describe("register", () => {
  test("should be register user", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        name: "anyName",
        email: "anymail17@mail.com.br",
        telephone: [{ ddd: "11", phone: "55555555" }],
      })

    expect(response.statusCode).toBe(404)
  })
})
