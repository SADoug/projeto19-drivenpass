import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import AuthService from "../services/AuthService"
import { users } from "@prisma/client"
import { sessions } from "@prisma/client";



export type CreateUser = Omit<users, "id">;
export type CreateSession = Omit<sessions, "id">;

interface LoginSession {
    email: string,
    id: number,
    token: string
}

export async function postUser(req: Request, res: Response) {
    const CreateUser = req.body
    await AuthService.UserInsertService(CreateUser);
    res.sendStatus(201)

}

export async function postSignin(req: Request, res: Response) {
    const { user } = res.locals
    console.log("users do local storage", user[0].id)
    const { email } = req.body
    const secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token: JwtPayload | Secret = jwt.sign(user[0].id, secretKey)
    console.log("O seu token é", token)
    const LoginSession: LoginSession = {
        email, id: user[0].id, token
    }
    await AuthService.LoginSession(LoginSession)
    res.send({ ...user, token })

}

