import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import wifiService from "../services/wifiService"
import { wifi } from "@prisma/client";
export type CreateWifi = Omit<wifi, "id">;


export async function postWifi(req: Request, res: Response) {
    const { name, password, title } = req.body
    const id = res.locals.userId
    const createWifi: CreateWifi = {
        name,
        password,
        title,
        user_id: parseInt(id)
    }
    const repo = await wifiService.WifiInsert(createWifi);
    res.send(repo).status(201)

}

export async function getWifi(res: Response) {
    const id = parseInt(res.locals.userId)

    const repo = await wifiService.WifiGetService(id);
    res.send(repo).status(201)
}

export async function getWifiById(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const wifiId = parseInt(req.params.id)


    const repo = await wifiService.WifiGeByIdService(id, wifiId);
    res.send(repo).status(201)
}
export async function WifiDelete(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const wifiId = parseInt(req.params.id)

    const repo = await wifiService.WifiDeleteService(wifiId, id);
    res.send(repo).status(201)
}