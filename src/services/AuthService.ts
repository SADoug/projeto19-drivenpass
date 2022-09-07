import bcrypt from "bcrypt"
import authRepository from "../repositories/AuthRepository"
import { users } from "@prisma/client"
import { sessions } from "@prisma/client";


export type CreateUser = Omit<users, "id">;
export type CreateSession = Omit<sessions, "id">;
async function UserInsertService(CreateUser: CreateUser) {
    const hashedPassword = bcrypt.hashSync(CreateUser.password, 10)
    const result = await authRepository.getUserByEmail(CreateUser.email)
    if (result[0]) { throw { type: "conflict", message: "email already exists" } }
    await authRepository.insertUserDb(
        CreateUser.username,
        CreateUser.email,
        hashedPassword,
    )
}

async function LoginSession(LoginSession: CreateSession) {
    const result = await authRepository.getUserByEmail(LoginSession.email)
    console.log(result)
    if (!result[0]) { throw { type: "conflict", message: "email does not exist" } }
    await authRepository.insertSession(
        LoginSession.id,
        LoginSession.token,
    )
}

const AuthService = {
    UserInsertService,
    LoginSession
}

export default AuthService
