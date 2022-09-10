import { Router } from "express"
import { ValidadeNotes } from "../middlewares/ValidadeMiddleware" 
import { postNotes, getNotes, getNotesById, NotesDelete } from "../controllers/notesController"
import { tokenValidation } from "../middlewares/tokenValidation"

const notesRouter = Router()
notesRouter.post(
    "/notes",
    ValidadeNotes,
    tokenValidation,
    postNotes,
)
notesRouter.get(
    "/notes",
    tokenValidation,
    getNotes,
)
notesRouter.get(
    "/notes/:id",
    tokenValidation,
    getNotesById,
)
notesRouter.delete(
    "/notes/:id",
    tokenValidation,
    NotesDelete,
)
export default notesRouter
