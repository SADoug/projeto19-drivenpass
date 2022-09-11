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


export const credentialSchema = Joi.object({
  url: Joi.string().required().min(1),
  username: Joi.string().required().min(1),
  password: Joi.string().required().min(10),
  title: Joi.string().required().min(1)
})
export const notesSchema = Joi.object({
  title: Joi.string().required().max(50),
  description: Joi.string().required().max(1000),
})

export const cardSchema = Joi.object({
  name: Joi.string().required().min(1),
  number: Joi.string().required().min(1),
  password: Joi.string().required().min(10),
  CVC: Joi.string().required().min(1),
  expiration_date: Joi.string().required().min(1),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().required().min(1),

})
export const wifi = Joi.object({
  name: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
  title: Joi.string().required().min(1)
})