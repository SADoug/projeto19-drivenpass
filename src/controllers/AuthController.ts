import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import AuthService from "../services/AuthService"
import authRepository from "../repositories/AuthRepository";




export async function postUser(req: Request, res: Response) {
    const { username, email, password } = req.body

    const CreateUser = {
        username,
        email,
        password
    }
    const repo = await UserInsertService(CreateUser);
    res.send(repo).status(201)

}

export async function postSignin(req: Request, res: Response) {
    const { user } = res.locals
    console.log("users do local storage", user[0].id)
    const { email } = req.body
    const secretKey = process.env.JWT_SECRET_KEY
    const token: JwtPayload | String = jwt.sign(user[0].id, secretKey)
    const LoginSession = {
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
