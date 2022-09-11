import wifiRepository from "../repositories/wifiRepository"
import { wifi } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateWifi = Omit<wifi, "id">;

async function WifiInsert(createWifi: CreateWifi) {

    const titlecheck = await wifiRepository.getUserByIdandTitle(createWifi.title, createWifi.user_id)
    if (titlecheck[0]) { throw { type: "not_found", message: "title already exists for this wifi" } }

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    const hashedPassword = cryptr.encrypt(createWifi.password);
    await wifiRepository.insertWifi(
        createWifi.name,
        createWifi.title,
        hashedPassword,
        createWifi.user_id
    )
}

async function WifiGetService(id: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await wifiRepository.WifiGet(id)
    if (!result[0]) { throw { type: "not_found", message: "this wifi does not have connection with this user or does not exist" } }
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const descrypPassword = cryptr.decrypt(element.password);
        result[i].password = descrypPassword

    }
    return result
}

async function WifiGeByIdService(id: number, wifiId: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await wifiRepository.WifiGetById(id, wifiId)
    if (!result[0]) { throw { type: "not_found", message: "this wifi does not have connection with this user or does not exist" } }
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const descrypPassword = cryptr.decrypt(element.password);
        result[i].password = descrypPassword

    }
    console.log(result)
    return result
}

async function WifiDeleteService(wifiId: number, user_id: number) {
    let result = await wifiRepository.WifiGetById(user_id, wifiId)
    if (!result[0]) { throw { type: "not_found", message: "this wifi does not have connection with this user or does not exist" } }
    return await wifiRepository.WifiDelete(wifiId)
}

const wifiService = {
    WifiInsert,
    WifiGetService,
    WifiGeByIdService,
    WifiDeleteService
}

export default wifiService