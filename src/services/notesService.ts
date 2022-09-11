import notesRepository from "../repositories/notesRepository"
import { notes } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateNotes = Omit<notes, "id">;

async function notesInsert(createNote: CreateNotes) {

    const titlecheck = await notesRepository.getUserByIdandTitle(createNote.title, createNote.id)
    if (titlecheck[0]) { throw { type: "conflict", message: "title already exists for this user" } }

    await notesRepository.insertNotes(
        createNote.description,
        createNote.title,
        createNote.userId
    )
}

async function notesGetService(id: number) {
    console.log(id)
    let result = await notesRepository.NotesGet(id)
    console.log(result)
    return result
}

async function notesGeByIdService(id: number, notesId: number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPT_KEY);
    let result = await notesRepository.NotesGetById(id, notesId)
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
  

async function notesDeleteService(notesId: number) {

    return await notesRepository.NotesDelete(notesId)
}

const notesService = {
    notesInsert,
    notesGetService,
    notesGeByIdService,
    notesDeleteService
}

export default notesService