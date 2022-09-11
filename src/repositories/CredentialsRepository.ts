import client from "../config/database"

async function insertCredentials(url: string, username: string, title: string, hashedPassword: string, user_id: number) {
    return client.credentials.create({
        data: {
            url,
            username,
            title,
            password: hashedPassword,
            user: { connect: { id: user_id } }
        }
    });
}

async function getUserByIdandTitle(title: string, id: number) {
    return client.credentials.findMany({
        where: {
            title: title,
            user_id: id
        }
    });
}

async function CredentialsGet(id: number) {
    return client.credentials.findMany({
        where: {
            user_id: id
        }
    })
}

async function CredentialsGetById(user_id: number, credentialId: number) {
    return client.credentials.findMany({
        where: {
            user_id,
            id: credentialId
        }
    })
}

async function CredentialsDelete(credentialId: number) {
    return client.credentials.delete({
        where: {
            id: credentialId
        }
    })
}

const credentialsRepository = {
    getUserByIdandTitle,
    insertCredentials,
    CredentialsGet,
    CredentialsGetById,
    CredentialsDelete
}

export default credentialsRepository
