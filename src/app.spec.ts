/* eslint-disable @typescript-eslint/no-explicit-any */

import request from "supertest"
import { app } from "./app"

describe("the host is working ?", () => {
  it("should be return 200 status ", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
})
