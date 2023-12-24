import { IUser, ILoginUser } from '../interface/UserInterface'
import {userSignUp, userLogin} from '../validitor/userValidation'
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

    static async login(request:ILoginUser){

        const{error} = await userLogin.validate(request)
        if(error){
            throw new Error(error.details[0].message)
        }else{
            const {userName,password} = request
            const result = await userService.login(userName,password)
            return result
        }
    }
  }
