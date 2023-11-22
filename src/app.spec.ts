/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from "./app"
import request from "supertest"

let server: any
const port = process.env.PORT_TEST || 3001
beforeAll(async () => {
  // Encontra uma porta disponível dinamicamente
  // Inicia o servidor na porta encontrada
  server = app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`)
  })
})

afterAll((done) => {
  // Fecha o servidor após os testes
  server.close(done)
})
describe("the host is working ?", () => {
  it("should be return 200 status ", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
})