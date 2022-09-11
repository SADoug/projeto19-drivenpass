import { Router } from "express"
import { Validadewifi } from "../middlewares/ValidadeMiddleware"
import { postWifi, getWifi, getWifiById, WifiDelete } from "../controllers/wifiController"
import { tokenValidation } from "../middlewares/tokenValidation"

const wifiRouter = Router()
wifiRouter.post(
    "/wifi",
    Validadewifi,
    tokenValidation,
    postWifi,
)
wifiRouter.get(
    "/wifi",
    tokenValidation,
    getWifi,
)
wifiRouter.get(
    "/wifi/:id",
    tokenValidation,
    getWifiById,
)
wifiRouter.delete(
    "/wifi/:id",
    tokenValidation,
    WifiDelete,
)
export default wifiRouter
