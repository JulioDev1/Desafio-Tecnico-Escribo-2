"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_express2 = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");

// src/routes.ts
var import_express = require("express");

// src/core/User/Service/RegisterUser.ts
var import_client = require("@prisma/client");
var import_bcrypt = require("bcrypt");
var RegisterUser = class {
  constructor() {
    this.prisma = new import_client.PrismaClient();
  }
  async execute(data) {
    try {
      const { name, email, password, telephone } = data;
      if (!email) {
        return { message: "email is required", status: "error" };
      }
      const emailAlready = await this.prisma.user.findUnique({
        where: {
          email
        }
      });
      if (emailAlready) {
        return { message: "email already exist", status: "error" };
      }
      const hashPassword = await (0, import_bcrypt.hash)(password, 8);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          telephone: {
            create: telephone.map((phone) => ({
              ddd: phone.ddd,
              phone: phone.phone
            }))
          }
        }
      });
      return {
        id: user.id,
        createdAt: user.createdAt,
        updateAt: user.updateAt
      };
    } catch (error) {
      console.log(error);
      return { status: "error", message: `error is ${error}` };
    }
  }
};

// src/adpaters/RegisterController.ts
var RegisterController = class {
  async createAccountController(request, response) {
    try {
      const {
        name,
        email,
        password,
        telephone: [{ ddd, phone }]
      } = request.body;
      const registerUser = new RegisterUser();
      const user = await registerUser.execute({
        name,
        email,
        password,
        telephone: [{ ddd, phone }]
      });
      return response.json(user);
    } catch (error) {
      response.status(500).json("error in server");
    }
  }
};

// src/core/User/Service/LoginUser.ts
var import_client2 = require("@prisma/client");
var import_bcrypt2 = require("bcrypt");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var LoginUser = class {
  constructor() {
    this.prisma = new import_client2.PrismaClient();
  }
  async execute(input) {
    const { email, password } = input;
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });
    if (!user) {
      return { message: "user or password incorrect", status: "error" };
    }
    const passwordMatch = await (0, import_bcrypt2.compare)(password, user.password);
    if (!passwordMatch) {
      return { message: "user or password incorrect", status: "error" };
    }
    const token = await import_jsonwebtoken.default.sign({}, process.env.UUID ?? "", {
      subject: user.id,
      expiresIn: "30min"
    });
    return {
      token,
      id: user.id,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
      lastLogin: user.lastLogin === null ? /* @__PURE__ */ new Date() : user.lastLogin
    };
  }
};

// src/adpaters/AuthController.ts
var AuthController = class {
  async authAccountController(request, response) {
    const { email, password } = request.body;
    const authenticate = new LoginUser();
    const token = await authenticate.execute({ email, password });
    return response.json(token);
  }
};

// src/Middleware/Authmiddleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
async function AuthMiddleware(request, response, next) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    response.status(401).json({
      message: "token is missing"
    });
  }
  const [, token] = authToken.split(" ");
  try {
    import_jsonwebtoken2.default.verify(token, process.env.UUID ?? "");
    return next();
  } catch (error) {
    response.status(401).json({
      message: "invalid token"
    });
  }
}

// src/routes.ts
var router = (0, import_express.Router)();
var registerController = new RegisterController();
var loginController = new AuthController();
router.post("/create", registerController.createAccountController);
router.post("/authenticate", loginController.authAccountController);
router.get("/", (request, response) => {
  response.status(200).send("Funcionando!");
});
router.get("/get-user", AuthMiddleware, (request, response) => {
  response.json([
    { id: 1, name: "teste" },
    { id: 2, name: "acess route" }
  ]);
});

// src/app.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use(router);
app.use((error, request, response) => {
  return response.json({ status: "Error", message: error.message });
});

// src/server.ts
var port = process.env.PORT;
app.listen(port, () => console.log(`server isrunning in port now ${port}`));
