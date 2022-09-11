import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import cardsService from "../services/CardsService"

export async function postCard(req: Request, res: Response) {
    const { name, number, CVC, expiration_date, password, isVirtual, type } = req.body
    const id = res.locals.userId
    const createCard = {
        name, number, CVC, expiration_date, password, isVirtual, type,
        userId: parseInt(id)
    }
    const repo = await cardsService.CardsInsert(createCard);
    res.send(repo).status(201)

}

export async function getCards(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const repo = await cardsService.CardsGetService(id);
    res.send(repo).status(201)
}

export async function getCardsById(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const cardId = parseInt(req.params.id)
    const repo = await cardsService.CardsGeByIdService(id, cardId);
    res.send(repo).status(201)
}
export async function CardsDelete(req: Request, res: Response) {
    const user_id = parseInt(res.locals.userId)
    const cardId = parseInt(req.params.id)
    const repo = await cardsService.CardsDeleteService(user_id, cardId);
    res.send(repo).status(201)
}