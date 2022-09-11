import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import notesService from "../services/notesService"




export async function postNotes(req: Request, res: Response) {
    const { description, title } = req.body
    const id = res.locals.userId
    console.log("Esse é o seu ID", id)
    const createNote = {
        description,
        title,
        userId: parseInt(id)
    }
    const repo = await notesService.notesInsert(createNote);
    res.send(repo).status(201)

}

export async function getNotes(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    console.log("Esse é o seu ID", id)

    const repo = await notesService.notesGetService(id);
    res.send(repo).status(201)
}

export async function getNotesById(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const noteslId = parseInt(req.params.id)
    console.log("Esse é o seu user ID", id)

    const repo = await notesService.notesGeByIdService(id, noteslId);
    res.send(repo).status(201)
}
export async function NotesDelete(req: Request, res: Response) {
    const id = parseInt(res.locals.userId)
    const notesId = parseInt(req.params.id)

    console.log("Esse é o seu ID", id)
    const repo = await notesService.notesDeleteService(notesId);
    res.send(repo).status(201)
}