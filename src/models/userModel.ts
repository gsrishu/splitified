import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interface/UserInterface'

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
const insertUser = async (userName:string,email:string,password:string) => {
    try{
        const userData = new userModel({
            userName:userName,
            email:email,
            password:password
        })
        const result  = await userData.save();
        return result;
    }catch(error){
        throw error
    }
}
const checkUser = async (userName: string, email: string) => {
 try{
    const result = await userModel.find({ $or: [{ userName }, { email }] })
    return result
 }catch(error){
    return error;
 }
}
export { userModel, getUser, insertUser, checkUser }
