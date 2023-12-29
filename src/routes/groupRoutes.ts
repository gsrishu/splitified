import express from 'express'
import { groupController } from '../controllers/groupController'
const groupRouter = express.Router()
import Authentication from '../authentication/auth'
import { successResponse, httpStatusCode, errorLang } from '../response/index'
import _ from 'lodash'
import { group } from 'console'
/**
 * @swagger
 * tags:
 *   - name: Group
 *     description: Operations related to Group
 * paths:
 *   /group/create-group:
 *     post:
 *       summary: Create a new Group
 *       description: Create a new Group
 *       tags:
 *         - Group
 *       requestBody:
 *         description: Group data
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groupName:
 *                   type: string
 *               required:
 *                 - groupName
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example
 *                 message: Group created successfully
 */
const validateTokenMiddleware = async (req: any, res: any, next: any) => {
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
groupRouter.get('/group', (req, res) => {
  res.send('group created')
})
groupRouter.post(
  '/create-group',
  validateTokenMiddleware,
  async (req: any, res) => {
    const result = await groupController.createGroup(req.body, req.tokenResult)
    res.send(result)
  },
)
groupRouter.post(
  '/add-member',
  validateTokenMiddleware,
  async (req: any, res) => {
    const result = await groupController.addMembers(req.body, req.tokenResult)
    res.send(result)
  },
)
groupRouter.post(
  '/delete-member',
  validateTokenMiddleware,
  async (res, req) => {
    const result = await groupController.deleteMember(res.body)
    req.send(result)
  },
)
export default groupRouter
