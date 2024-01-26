import Authentication from './auth'
import { httpStatusCode, errorLang } from '../response'
export const validateTokenMiddleware = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const token = req.headers.jwt_token as string
    const tokenResult = await Authentication.validateToken(token)
    req.tokenResult = tokenResult
    next()
  } catch (error) {
    return res.status(httpStatusCode.clientError.UNAUTHORIZED).send({
      statusCode: httpStatusCode.clientError.UNAUTHORIZED,
      message: errorLang.message.USER_NOT_AUTHENTICATED,
    })
  }
}
