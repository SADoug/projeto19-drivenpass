import client from "../config/database"

async function insertNotes(description: string, title: string, userId: number) {
    return client.notes.create({
        data: {
            title,
            description,
            user: { connect: { id: userId } }
        }
    });
}

async function getUserByIdandTitle(title: string, id: number) {
    return client.notes.findMany({
        where: {
            title: title,
            user_id: id
        }
    });
}

async function NotesGet(id: number) {
    return client.notes.findMany({
        where: {
            user_id: id
        }
    })
}

async function NotesGetById(id: number, notesId: number) {
    return client.notes.findMany({
        where: {
            user_id: id,
            id: notesId
        }
    })
}

async function NotesDelete(notesId: number) {
    return client.notes.delete({
        where: {
            id: notesId
        }
    })
}

const credentialsRepository = {
    getUserByIdandTitle,
    insertNotes,
    NotesGet,
    NotesGetById,
    NotesDelete
}

export default credentialsRepository
