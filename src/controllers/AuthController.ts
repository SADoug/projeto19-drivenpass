import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import AuthService from "../services/AuthService"
import authRepository from "../repositories/AuthRepository";
import { users } from "@prisma/client"
import { sessions } from "@prisma/client";



export type CreateUser = Omit<users, "id", "CreatedAt">;
export type CreateSession = Omit<sessions, "id">;



export async function postUser(req: Request, res: Response) {
    const { username, email, password } = req.body

    const CreateUser: CreateUser = {
        username,
        email,
        password
    }
    const repo: CreateUser  = await AuthService.UserInsertService(CreateUser);
    res.send(repo).status(201)

}

export async function postSignin(req: Request, res: Response) {
    const { user } = res.locals
    console.log("users do local storage", user[0].id)
    const { email }: string = req.body
    const secretKey = process.env.JWT_SECRET_KEY
    const token: JwtPayload | String = jwt.sign(user[0].id, secretKey)
    console.log("O seu token é",token)
    const LoginSession: CreateSession = {
        email, id: user[0].id, token
    }
    await AuthService.LoginSession(LoginSession)
    res.send({ ...user, token })

}

export async function deleteSession(req: Request, res: Response) {

    const { token } = res.locals
    await authRepository.deleteSessionByToken(token)
    res.sendStatus(200)

}
