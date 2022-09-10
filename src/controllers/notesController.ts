import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import CredentialService from "../services/CredentialsService"




export async function postCredential(req: Request, res: Response) {
    const { url, username, password, title } = req.body
    const id = res.locals.userId
    console.log("Esse é o seu ID", id)
    const createCredential = {
        url,
        username,
        password,
        title,
        userId: parseInt(id)
    }
    const repo = await CredentialService.CredentialInsert(createCredential);
    res.send(repo).status(201)

}

export async function getCredentials(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    console.log("Esse é o seu ID", id)

    const repo = await CredentialService.CredentialGetService(id);
    res.send(repo).status(201)
}

export async function getCredentialsById(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const credentialId = parseInt(req.params.id)

    console.log("Esse é o seu user ID", id)

    const repo = await CredentialService.CredentialGeByIdService(id, credentialId);
    res.send(repo).status(201)
}
export async function CredentialsDelete(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const credentialId = parseInt(req.params.id)

    console.log("Esse é o seu ID", id)

    const repo = await CredentialService.CredentialDeleteService(credentialId);
    res.send(repo).status(201)
}