import { Router } from "express"
import { ValidadeCredential } from "../middlewares/ValidadeMiddleware"
import { postCredential, getCredentials, getCredentialsById, CredentialsDelete } from "../controllers/credentialsController"
import { tokenValidation } from "../middlewares/tokenValidation"

const credentialsRouter = Router()
credentialsRouter.post(
    "/credentials",
    ValidadeCredential,
    tokenValidation,
    postCredential,
)
credentialsRouter.get(
    "/credentials",
    tokenValidation,
    getCredentials,
)
credentialsRouter.get(
    "/credentials/:id",
    tokenValidation,
    getCredentialsById,
)
credentialsRouter.delete(
    "/credentials/:id",
    tokenValidation,
    CredentialsDelete,
)
export default credentialsRouter
