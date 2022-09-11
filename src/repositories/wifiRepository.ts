import client from "../config/database"

async function insertWifi(name: string, title: string, hashedPassword: string, userId: number) {
    return client.wifi.create({
        data: {
            name,
            title,
            password: hashedPassword,
            user: { connect: { id: userId } }
        }
    });
}

async function getUserByIdandTitle(title: string, id: number) {
    return client.wifi.findMany({
        where: {
            title: title,
            user_id: id
        }
    });
}

async function WifiGet(id: number) {
    return client.wifi.findMany({
        where: {
            user_id: id
        }
    })
}

async function  WifiGetById(id: number, wifiId: number) {
    return client.wifi.findMany({
        where: {
            user_id: id,
            id: wifiId
        }
    })
}

async function  WifiDelete(wifiId: number) {
    return client.wifi.delete({
        where: {
            id: wifiId
        }
    })
}

const credentialsRepository = {
    getUserByIdandTitle,
    insertWifi,
    WifiGet,
    WifiGetById,
    WifiDelete
}

export default credentialsRepository
