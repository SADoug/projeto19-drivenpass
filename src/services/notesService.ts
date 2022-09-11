import notesRepository from "../repositories/notesRepository"
import { notes } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

export type CreateNotes = Omit<notes, "id">;

async function notesInsert(createNote: CreateNotes) {

    const titlecheck = await notesRepository.getUserByIdandTitle(createNote.title, createNote.user_id)
    if (titlecheck[0]) { throw { type: "conflict", message: "title already exists for this user" } }
    await notesRepository.insertNotes(
        createNote.description,
        createNote.title,
        createNote.user_id
    )
}

async function notesGetService(id: number) {
    let result = await notesRepository.NotesGet(id)
    if (!result[0]) { throw { type: "not_found", message: "this note does not have connection with this user or does not exist" } }
    return result
}

async function notesGeByIdService(id: number, notesId: number) {
    let result = await notesRepository.NotesGetById(id, notesId)
    if (!result[0]) { throw { type: "not_found", message: "this note does not have connection with this user or does not exist" } }
    console.log(result)
    return result
}


async function notesDeleteService(user_id: number, notesId: number) {
    let result = await notesRepository.NotesGetById(user_id, notesId)
    if (!result[0]) { throw { type: "not_found", message: "this note does not have connection with this user or does not exist" } }
    return await notesRepository.NotesDelete(notesId)
}

const notesService = {
    notesInsert,
    notesGetService,
    notesGeByIdService,
    notesDeleteService
}

export default notesService