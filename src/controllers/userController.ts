import { IUser } from '../interface/UserInterface'
import {userSignUp} from '../validitor/userValidation'
import { userService } from '../services/userService'
export class UserController {
  
    static async signUp(request: IUser) {
     
        const {userName,email,password} = request;
        const {error,value} = userSignUp.validate(request)
        if(error){
            throw new Error(error.details[0].message) 
        }else{
            const result = await userService.signup(userName,email,password);
            return result
        }
    }
  }
