import { Router } from "express"
import { ValidadeCredential } from "../middlewares/ValidadeMiddleware"
import { postCredential, getCredentials, getCredentialsById, CredentialsDelete } from "../controllers/credentialsController"
import { tokenValidation } from "../middlewares/tokenValidation"

const notesRouter = Router()
notesRouter.post(
    "/credentials",
    ValidadeCredential,
    tokenValidation,
    postCredential,
)
notesRouter.get(
    "/credentials",
    tokenValidation,
    getCredentials,
)
notesRouter.get(
    "/credentials/:id",
    tokenValidation,
    getCredentialsById,
)
notesRouter.delete(
    "/credentials/:id",
    tokenValidation,
    CredentialsDelete,
)
export default notesRouter
