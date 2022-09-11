import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import CredentialService from "../services/CredentialsService"
import { credentials } from "@prisma/client";

export type CreateCredential = Omit<credentials, "id">;



export async function postCredential(req: Request, res: Response) {
    const { url, username, password, title } = req.body
    const id = res.locals.userId
    const createCredential: CreateCredential = {
        url,
        username,
        password,
        title,
        user_id: parseInt(id)
    }
    const repo = await CredentialService.CredentialInsert(createCredential);
    res.send(repo).status(201)

}

export async function getCredentials(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const body = req.body
    let result = await CredentialService.CredentialGetService(id);
    return res.send(result)
}

export async function getCredentialsById(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const credentialId = parseInt(req.params.id)

    const repo = await CredentialService.CredentialGeByIdService(id, credentialId);
    res.send(repo).status(201)
}
export async function CredentialsDelete(req: Request, res: Response) {
    const user_id = parseInt(res.locals.userId)
    const credentialId = parseInt(req.params.id)

    const repo = await CredentialService.CredentialDeleteService(user_id, credentialId);
    res.send(repo).status(201)
}