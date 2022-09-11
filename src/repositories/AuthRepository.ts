import client from "../config/database"

async function insertUserDb(username: string, email: string, hashedPassword: string) {
  return client.users.create({
    data: {
      username,
      password: hashedPassword,
      email
    }
  });
}

async function getUserByEmail(email: string) {
  return client.users.findMany({
    where: {
      email: email
    }
  });
}



async function insertSession(userId: number, token: string) {
  return await client.sessions.create({
    data: {
      user_id: userId,
      token
    }
  });
}



const authRepository = {
  insertUserDb,
  getUserByEmail,
  insertSession,
}

export default authRepository
