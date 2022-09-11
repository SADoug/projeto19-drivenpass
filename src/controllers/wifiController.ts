import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import wifiService from "../services/wifiService"




export async function postWifi(req: Request, res: Response) {
    const { name, password, title } = req.body
    const id = res.locals.userId
    console.log("Esse é o seu ID", id)
    const createWifi = {
        name,
        password,
        title,
        userId: parseInt(id)
    }
    const repo = await wifiService.WifiInsert(createWifi);
    res.send(repo).status(201)

}

export async function getWifi(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    console.log("Esse é o seu ID", id)

    const repo = await wifiService.WifiGetService(id);
    res.send(repo).status(201)
}

export async function getWifiById(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const wifiId = parseInt(req.params.id)

    console.log("Esse é o seu user ID", id)

    const repo = await wifiService.WifiGeByIdService(id, wifiId);
    res.send(repo).status(201)
}
export async function WifiDelete(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const wifiId = parseInt(req.params.id)

    console.log("Esse é o seu ID", id)

    const repo = await wifiService.WifiDeleteService(wifiId);
    res.send(repo).status(201)
}