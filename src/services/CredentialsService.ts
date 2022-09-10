import credentialsRepository from "../repositories/CredentialsRepository"
import { credentials } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateCredential = Omit<credentials, "id">;

async function CredentialInsert(createCredential: CreateCredential) {

    const titlecheck = await credentialsRepository.getUserByIdandTitle(createCredential.title, createCredential.id)
    if (titlecheck[0]) { throw { type: "conflict", message: "title already exists for this user" } }

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    const hashedPassword = cryptr.encrypt(createCredential.password);
    console.log(hashedPassword)
    await credentialsRepository.insertCredentials(
        createCredential.url,
        createCredential.username,
        createCredential.title,
        hashedPassword,
        createCredential.userId
    )
}

async function CredentialGetService(id: number) {
    console.log(id)
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await credentialsRepository.CredentialsGet(id)
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

async function CredentialGeByIdService(id: number, credentialId: number) {
    console.log(id)
    return await credentialsRepository.CredentialsGetById(id, credentialId)
}

async function CredentialDeleteService(credentialId: number) {

    return await credentialsRepository.CredentialsDelete(credentialId)
}

const CredentialService = {
    CredentialInsert,
    CredentialGetService,
    CredentialGeByIdService,
    CredentialDeleteService
}

export default CredentialService