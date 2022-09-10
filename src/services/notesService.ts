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
    console.log(id)
    return await notesRepository.NotesGetById(id, notesId)
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