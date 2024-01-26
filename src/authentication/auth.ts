import * as Jwt from 'jsonwebtoken'
import { TokenExpiredError } from 'jsonwebtoken'
import { config } from '../config'
import bcrypt from 'bcrypt'
import { httpStatusCode, errorLang } from '../response/index'
interface Ipayload {
  userId:string
}
class Authentication {
  async generateToken(payload: Ipayload): Promise<string> {
    return await Jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1000000000h' })
  }
  async hashPassword(password: string): Promise<string> {
    try {
      const saltRound = 10
      const result = await bcrypt.hash(password, saltRound)
      return result
    } catch (error) {
      throw error
    }
  }

  async validatePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, hashPassword)
      return result
    } catch (error) {
      throw new Error('Error validating password')
    }
  }

  async validateToken(token: string) {
    try {
      if (!token) {
        throw {
          statusCode: httpStatusCode.clientError.UNAUTHORIZED,
          message: errorLang.message.USER_NOT_AUTHENTICATED,
        }
      } else {
        const decodedToken: any = await Jwt.verify(token, config.JWT_SECRET)
        return decodedToken
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw {
          statusCode: httpStatusCode.clientError.UNAUTHORIZED,
          message: errorLang.message.TOKEN_EXPIRED,
        }
      }
      throw error
    }
  }
}

export default new Authentication()
