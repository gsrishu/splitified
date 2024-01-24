import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interface/UserInterface'
import authObj from '../authentication/auth'
import * as _ from 'lodash'
const { v4: uuidv4 } = require('uuid')
const userSchema: Schema<IUser> = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
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

const getUserId = async (userId: string) => {
  try {
    const userIdData = await userModel.findOne({
      _id: userId,
    })
    if (!_.isEmpty(userIdData)) {
      return _.get(userIdData, '_id')
    }
  } catch (error) {
    throw error
  }
}
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
    if (!_.isEmpty(result)) {
      const storedPassword = _.get(result, '[0].password', '')
      const userId = _.get(result, '[0]._id')
      const pwdCompare = await authObj.validatePassword(
        password,
        storedPassword,
      )
      return { pwdCompare, userId }
    }
    return false
  } catch (error) {
    return error
  }
}
const getMember = async (userId: string) => {
  try {
    const result = await userModel.findOne({ _id: userId })
    if (!_.isEmpty(result)) {
      return result._id
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}
export { userModel, getUserId, insertUser, checkUser, loginUser, getMember }
