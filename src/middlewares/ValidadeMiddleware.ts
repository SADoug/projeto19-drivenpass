import { Request, Response, NextFunction } from "express"
import { signupSchema, signinSchema, credentialSchema, notesSchema, cardSchema, wifi } from "../schemas/Schema";
import authRepository from "../repositories/AuthRepository";

export function validatesignUpSchemaMiddleware(req: Request, res: Response, next: NextFunction) {
  const validation = signupSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  return next();
}

export async function validatesignInSchemaMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const validation = signinSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  const { email } = req.body
  const users = await authRepository.getUserByEmail(email)
  if (!users[0]) { throw { type: "conflict", message: "email does not exist" } }
  res.locals.user = users
  return next();
}

export async function ValidadeCredential(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const validation = credentialSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  return next();
}

export async function ValidadeNotes(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const validation = notesSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  return next();
}

export async function ValidadeCards(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const validation = cardSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  return next();
}


export async function Validadewifi(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const validation = wifi.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  return next();
}