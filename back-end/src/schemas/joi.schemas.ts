import Joi from "joi"

export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().required().min(6)
})

export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required().min(6),
});