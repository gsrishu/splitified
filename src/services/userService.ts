import { checkUser, insertUser, loginUser } from '../models/userModel'
import { splitifiedError } from '../errors/customError'
import { errorLang } from '../errors/errorLang'
import { IReturn, ILogin } from '../interface/CommonInterface'
import * as _ from 'lodash'
import authObj from '../authentication/auth'
export class userService {
  //Signup function

  static async signup(
    userName: string,
    email: string,
    password: string,
  ): Promise<IReturn> {
    try {
      const userCheck = await checkUser(userName, email)
      console.log('usercheck=>', userCheck)
      if (!_.isEmpty(userCheck)) {
        const userError = new splitifiedError(
          errorLang.message.USER_ALREADY_EXISTS,
          400,
          errorLang.process.signup,
          errorLang.service.userservice,
        )
        throw userError
      } else {
        const insertUserResult = await insertUser(userName, email, password)
        console.log('insertUserResult=>', insertUserResult)
        return {
          statusCode: insertUserResult ? 200 : 404,
          success: !!insertUserResult,
          message: insertUserResult
            ? 'User signup successful'
            : 'User signup failed',
        }
      }
    } catch (error: any) {
      console.info(error)
      return { statusCode: 404, success: false, message: error.message }
    }
  }

  //Login Function

  static async login(userName: string, password: string): Promise<ILogin> {
    try {
      const result = await loginUser(userName, password)
      if (!result) {
        const loginError = new splitifiedError(
          errorLang.message.INCORRECT_DETAILS,
          404,
          errorLang.process.login,
          errorLang.service.userservice,
        )
        throw loginError
      } else {
        try {
          const toeknResult = await authObj.generateToken({
            userName: userName,
          })
          return {
            statusCode: 200,
            success: true,
            message: 'Login Successful',
            authToken: toeknResult,
          }
        } catch (error) {
          console.info(error)
          throw error
        }
      }
    } catch (error: any) {
      console.info(error)
      return {
        statusCode: 404,
        success: false,
        message: error.message,
      }
    }
  }
}
