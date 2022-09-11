import { Router } from "express"

import {
    postSignin,
    postUser,
} from "../controllers/AuthController"

import {
    validatesignUpSchemaMiddleware,
    validatesignInSchemaMiddleware,
} from "../middlewares/ValidadeMiddleware"

const authRouter = Router()
authRouter.post(
    "/signup", // working
    validatesignUpSchemaMiddleware,
    postUser,
)
authRouter.post(
    "/signin",// working
    validatesignInSchemaMiddleware,
    postSignin,
)
// authRouter.post("/auto-login", tokenValidation, postAutoLogin)
// authRouter.delete("/session", tokenValidation, deleteSession) // working

export default authRouter
