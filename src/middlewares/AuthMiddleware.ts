
import { Response, Request, NextFunction } from "express"


export async function signupMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("teste fornt mid")
  const { email, username } = req.body

    const { rows: emails } = await authRepository.getEmail(email, username)
    const [emailConflict] = emails
    if (emailConflict) {
      return res.status(422).send("Email/Username already exists!")
    }
    return next()
  
  }


export async function signinMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body
 
  try {
    const { rows: users } = await authRepository.getUserByEmail(email)
    const [user] = users
    if (!user?.email) {
      return res.status(401).send("User not found!")
    }
    if (!bcrypt.compareSync(password, user?.password)) {
      return res.status(401).send("Incorrect password!")
    }
    delete user.password
    res.locals.user = user
    return next()
  } catch (error) {
   
    return res.status(500).send(error)
  }
}
