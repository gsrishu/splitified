import { getUser, checkUser, insertUser } from '../models/userModel'
import { splitifiedError } from '../errors/customError'
import { errorLang } from '../errors/errorLang'
import { IReturn } from '../interface/CommonInterface'
import * as _ from 'lodash'
export class userService {
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
          400,
          errorLang.process.signup,
          errorLang.service.userservice,
        )
        throw userError
      } else {
        const insertUserResult = await insertUser(userName, email, password)
        return {
          statusCode: insertUserResult ? 200 : 404,
          success: !!insertUserResult,
          message: insertUserResult
            ? 'User signup successful'
            : 'User signup failed',
        }
      }
    } catch (error:any) {
     console.info(error)
      return { statusCode: 404, success: false, message:error.message }
    }
  }
}
