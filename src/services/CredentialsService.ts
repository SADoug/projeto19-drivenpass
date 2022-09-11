import credentialsRepository from "../repositories/CredentialsRepository"
import { credentials } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateCredential = Omit<credentials, "id">;

async function CredentialInsert(createCredential: CreateCredential) {
   console.log(createCredential.userId, createCredential.title)
    const titlecheck = await credentialsRepository.getUserByIdandTitle(createCredential.title, createCredential.user_id)
    if (titlecheck[0]) { throw { type: "conflict", message: "title already exists for this user" } }

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    const hashedPassword = cryptr.encrypt(createCredential.password);
    await credentialsRepository.insertCredentials(
        createCredential.url,
        createCredential.username,
        createCredential.title,
        hashedPassword,
        createCredential.user_id
    )
}

async function CredentialGetService(id: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await credentialsRepository.CredentialsGet(id)
    if (!result[0]) { throw { type: "not_found", message: "this credential does not have connection with this user or does not exist" } }
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const descrypPassword = cryptr.decrypt(element.password);
        result[i].password = descrypPassword
    }
    console.log(result)
    return result
}

async function CredentialGeByIdService(user_id: number, credentialId: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await credentialsRepository.CredentialsGetById(user_id, credentialId)
    if (!result[0]) { throw { type: "not_found", message: "this credential does not have connection with this user or does not exist" } }
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const descrypPassword = cryptr.decrypt(element.password);
        console.log("#######", element.password, descrypPassword)
        result[i].password = descrypPassword
        console.log("#######", result[i])

    }
    console.log(result)
    return result
}

async function CredentialDeleteService(user_id: number, credentialId: number,) {
    let result = await credentialsRepository.CredentialsGetById(user_id, credentialId)
    if (!result[0]) { throw { type: "not_found", message: "this credential does not have connection with this user or does not exist" } }
    return await credentialsRepository.CredentialsDelete(credentialId)
}

const CredentialService = {
    CredentialInsert,
    CredentialGetService,
    CredentialGeByIdService,
    CredentialDeleteService
}

export default CredentialService