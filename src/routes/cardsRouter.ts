import { Router } from "express"
import { ValidadeCards } from "../middlewares/ValidadeMiddleware"
import { postCard, getCards, getCardsById, CardsDelete } from "../controllers/cardsController"
import { tokenValidation } from "../middlewares/tokenValidation"

const cardsRouter = Router()
cardsRouter.post(
    "/cards",
    ValidadeCards,
    tokenValidation,
    postCard,
)
cardsRouter.get(
    "/cards",
    tokenValidation,
    getCards,
)
cardsRouter.get(
    "/cards/:id",
    tokenValidation,
    getCardsById,
)
cardsRouter.delete(
    "/cards/:id",
    tokenValidation,
    CardsDelete,
)
export default cardsRouter
