import client from "../config/database"

async function insertCards(name: string, number: string, CVC: string, expiration_date: string,
    password: string, isVirtual: boolean, type: string, user_id: number,) {
    return client.cards.create({
        data: {
            name,
            number,
            CVC,
            expiration_date,
            password,
            isVirtual,
            type,
            user: { connect: { id: user_id } }
        }
    });
}

async function getUserByIdandTitle(name: string, id: number) {
    return client.cards.findMany({
        where: {
            name: name,
            user_id: id
        }
    });
}

async function CardsGet(id: number) {
    return client.cards.findMany({
        where: {
            user_id: id
        }
    })
}

async function CardsGetById(user_id: number, cardId: number) {
    return client.cards.findMany({
        where: {
            user_id,
            id: cardId
        }
    })
}

async function CardsDelete(cardId: number) {
    return client.cards.delete({
        where: {
            id: cardId
        }
    })
}

const credentialsRepository = {
    getUserByIdandTitle,
    insertCards,
    CardsGet,
    CardsGetById,
    CardsDelete
}

export default credentialsRepository
