import { checkUser, insertUser, loginUser } from '../models/userModel'
import { splitifiedError } from '../response/customError'
import { IReturn, ILogin } from '../interface/CommonInterface'
import * as _ from 'lodash'
import authObj from '../authentication/auth'
import { successResponse, httpStatusCode, errorLang } from '../response/index'
export class userService {
  //Signup function

  static async signup(
    userName: string,
    email: string,
    password: string,
  ): Promise<IReturn> {
    try {
      const userCheck = await checkUser(userName, email)
      if (!_.isEmpty(userCheck)) {
        const userError = new splitifiedError(
          errorLang.message.USER_ALREADY_EXISTS,
          httpStatusCode.clientError.CONFLICT,
          errorLang.process.signup,
          errorLang.service.userservice,
        )
        throw userError
      } else {
        const insertUserResult = await insertUser(userName, email, password)
        return {
          statusCode: insertUserResult
            ? httpStatusCode.success.CREATED
            : httpStatusCode.serverError.INTERNAL_SERVER_ERROR,
          success: !!insertUserResult,
          message: insertUserResult
            ? successResponse.message.SIGNUP_SUCCESSFULLY
            : errorLang.message.SIGNUP_FAILED,
        }
      }
    } catch (error: any) {
      console.info(error)
      return {
        statusCode: httpStatusCode.serverError.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message,
      }
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
            statusCode: httpStatusCode.success.OK,
            success: true,
            message: successResponse.message.LOGIN_SUCCESSFULLY,
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
        statusCode: httpStatusCode.serverError.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message,
      }
    }
  }
}
