import { app } from "./app"

const port = process.env.PORT
app.listen(port, () => console.log(`server isrunning in port now ${port}`))
