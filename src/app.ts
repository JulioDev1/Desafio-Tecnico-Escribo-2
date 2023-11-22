import express, { Response, Request } from "express"
import "express-async-errors"

import { router } from "./routes"

const app = express()
const port = 3000
app.use(express.json())

app.use("/", router)

app.use((error: Error, request: Request, response: Response) => {
  return response.json({ status: "Error", message: error.message })
})

app.listen(port, () => {
  console.log(`server isrunning in port now ${port}`)
})

export { app }
