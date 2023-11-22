import express, { Response, Request } from "express"
import "express-async-errors"

import { router } from "./routes"

const app = express()
app.use(express.json())

app.use(router)

app.use((error: Error, request: Request, response: Response) => {
  return response.json({ status: "Error", message: error.message })
})
export { app }
