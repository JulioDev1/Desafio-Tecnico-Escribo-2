import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization as string;

  if (!authToken) {
    response.status(401).json({
      message: "token is missing",
    });
  }
  const [, token] = authToken.split(" ");

  try {
    jwt.verify(token, process.env.UUID ?? "");
    return next();
  } catch (error) {
    message: "token invalid";
  }
}
