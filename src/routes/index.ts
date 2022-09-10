import { Router } from "express"
import authRouter from "./AuthRouter";
import credentialsRouter from "./credentialsRouter";


const router =  Router()

router.use(authRouter)
router.use(credentialsRouter)

export default router;
