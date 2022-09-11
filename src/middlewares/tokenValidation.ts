import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express"
dotenv.config()

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "").trim()
  if (!token) {
    return res
      .status(401)
      .send("You must pass an authorization token in the request header!")
  }
  const secretKey = process.env.JWT_SECRET_KEY || "secret";
  const data: JwtPayload | Secret = jwt.verify(token, secretKey)
  if (!data) { throw { type: "conflict", message: "email already exists" } }
  const id: JwtPayload | Secret = jwt.decode(token)
  res.locals.userId = id

  return next()
}
