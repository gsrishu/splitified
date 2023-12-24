import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interface/UserInterface'
import authObj from '../authentication/auth'
import * as _ from 'lodash'
const userSchema: Schema<IUser> = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    uinque: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})
const userModel = mongoose.model<IUser>('User', userSchema)

const getUser = async () => {}
const insertUser = async (
  userName: string,
  email: string,
  password: string,
) => {
  try {
    const hashPassword = await authObj.hashPassword(password)
    const userData = new userModel({
      userName: userName,
      email: email,
      password: hashPassword,
    })
    const result = await userData.save()
    return result
  } catch (error) {
    throw error
  }
}
const checkUser = async (userName: string, email: string) => {
  try {
    const result = await userModel.find({ $or: [{ userName }, { email }] })
    return result
  } catch (error) {
    return error
  }
}

const loginUser = async (userName: string, password: string) => {
  try {
    const result = await userModel.find({
      $or: [{ userName: userName }, { email: userName }],
    })
    if(!_.isEmpty(result)){
      const storedPassword = _.get(result,'[0].password','')
      const pwdCompare = await authObj.validatePassword(password,storedPassword)
      return pwdCompare
    }
    return false
  } catch (error) {
    return error
  }
}
export { userModel, getUser, insertUser, checkUser, loginUser }
