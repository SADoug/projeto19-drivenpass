import wifiRepository from "../repositories/wifiRepository"
import { wifi } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateWifi = Omit<wifi, "id">;

async function WifiInsert(createWifi: CreateWifi) {

    const titlecheck = await wifiRepository.getUserByIdandTitle(createWifi.title, createWifi.id)
    console.log(titlecheck)
    if (titlecheck[0]) { throw { type: "conflict", message: "title already exists for this user" } }

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    const hashedPassword = cryptr.encrypt(createWifi.password);
    console.log(hashedPassword)
    await wifiRepository.insertWifi(
        createWifi.name,
        createWifi.title,
        hashedPassword,
        createWifi.userId
    )
}

async function WifiGetService(id: number) {
    console.log(id)
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await wifiRepository.WifiGet(id)
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

async function WifiGeByIdService(id: number, wifiId: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await wifiRepository.WifiGetById(id, wifiId)
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

async function WifiDeleteService(wifiId: number) {

    return await wifiRepository.WifiDelete(wifiId)
}

const CredentialService = {
    WifiInsert,
    WifiGetService,
    WifiGeByIdService,
    WifiDeleteService
}

export default CredentialService