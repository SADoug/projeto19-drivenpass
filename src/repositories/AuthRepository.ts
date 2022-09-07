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

async function getSessionByToken(token: string) {
  return db.query(
    `SELECT users.id, sessions.token
    FROM sessions
    JOIN users ON sessions.user_id = users.id
    WHERE sessions.token = $1`,
    [token],
  )
}

async function deleteSessionByToken(token: string) {
  return db.query(
    `DELETE FROM sessions
    WHERE token = $1`,
    [token],
  )
}

const authRepository = {
  insertUserDb,
  getUserByEmail,
  insertSession,
  getSessionByToken,
  deleteSessionByToken,
}

export default authRepository
