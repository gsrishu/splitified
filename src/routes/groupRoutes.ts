import express from 'express'
import { groupController } from '../controllers/groupController'
const groupRouter = express.Router()
import Authentication from '../authentication/auth'
import { successResponse, httpStatusCode, errorLang } from '../response/index'
import _ from 'lodash'
export const validateTokenMiddleware = async (
  req: any,
  res: any,
  next: any,
) => {
  const token = req.headers.jwt_token as string
  const tokenResult = await Authentication.validateToken(token)
  if (tokenResult.statusCode === 401) {
    res.status(httpStatusCode.clientError.UNAUTHORIZED).send({
      statusCode: httpStatusCode.clientError.UNAUTHORIZED,
      message: errorLang.message.USER_NOT_AUTHENTICATED,
    })
    return
  }
  req.tokenResult = tokenResult
  next()
}
groupRouter.post(
  '/create-group',
  validateTokenMiddleware,
  async (req: any, res) => {
  
    const result = await groupController.createGroup(req.body, req.tokenResult)
    res.send(result)
  },
)
groupRouter.post(
  '/delete-group',
  validateTokenMiddleware,
  async (req: any, res) => {
    const result = await groupController.deleteGroup(req.query,req.tokenResult)
    res.send(result)
  },
)
groupRouter.get('/get-all-group',validateTokenMiddleware,async(req:any,res)=>{

  const result = await groupController.getAllGroup(req.tokenResult);

  res.send(result)
})
export default groupRouter
