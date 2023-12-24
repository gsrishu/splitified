import * as Jwt from 'jsonwebtoken'
import { config } from '../config'
import bcrypt from 'bcrypt'

interface Ipayload {
  userName: string
}
class Authentication {
  async generateToken(payload: Ipayload): Promise<string> {
    return await Jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' })
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
}

export default new Authentication()
