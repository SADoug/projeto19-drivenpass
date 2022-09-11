import cardsRepository from "../repositories/cardsRepository"
import { cards } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateCard = Omit<cards, "id">;

async function CardsInsert(createCard: CreateCard) {

    const titlecheck = await cardsRepository.getUserByIdandTitle(createCard.name, createCard.id)
    if (titlecheck[0]) { throw { type: "conflict", message: "title already exists for this user" } }

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    const password = cryptr.encrypt(createCard.password);
    console.log(password)
    await cardsRepository.insertCards(
        createCard.name,
        createCard.number,
        createCard.CVC,
        createCard.expiration_date,
        password,
        createCard.isVirtual,
        createCard.type,
        createCard.userId,

    )
}

async function CardsGetService(id: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await cardsRepository.CardsGet(id)
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const descrypPassword = cryptr.decrypt(element.password);
        result[i].password = descrypPassword
    }
    return result
}

async function CardsGeByIdService(id: number, cardId: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await cardsRepository.CardsGetById(id, cardId)
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        const descrypPassword = cryptr.decrypt(element.password);
        result[i].password = descrypPassword
    }
    return result
}

async function CardsDeleteService(cardId: number) {
    return await cardsRepository.CardsDelete(cardId)
}

const CredentialService = {
    CardsInsert,
    CardsGetService,
    CardsGeByIdService,
    CardsDeleteService
}

export default CredentialService