import Joi from "joi"

export const signupSchema = Joi.object({
  email: Joi.string().required().min(1),
  password: Joi.string().required().min(10),
  username: Joi.string().required().min(1),
})

export const signinSchema = Joi.object({
  email: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
})
