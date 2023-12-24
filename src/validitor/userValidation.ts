import * as Joi from 'joi'
import { IUser,ILoginUser } from '../interface/UserInterface'
export const userSignUp = Joi.object<IUser>({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const userLogin = Joi.object<ILoginUser>({
  userName:Joi.string().required(),
  password:Joi.string().required()
})
