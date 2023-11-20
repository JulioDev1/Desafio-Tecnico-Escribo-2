import express from "express";
import { RegisterUser } from "./core/User/Service/SignUpUser";

const app = express();
const port = 3000;
const registerUser = new RegisterUser();

app.listen(port, () => {
  console.log(`running in port ${port}`);
});
