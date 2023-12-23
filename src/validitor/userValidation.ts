import * as Joi from 'joi'
import { IUser } from '../interface/UserInterface'
export const userSignUp = Joi.object<IUser>({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})
