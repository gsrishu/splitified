import express from 'express'
import { groupController } from '../controllers/groupController'
const groupRouter = express.Router()
import Authentication from '../authentication/auth'
import { successResponse, httpStatusCode, errorLang } from '../response/index'
import _ from 'lodash'
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
groupRouter.get('/group', (req, res) => {
  res.send('group created')
})
groupRouter.post('/create-group', async (req, res) => {
  const token = req.headers.jwt_token as string
  const tokenResult: any = await Authentication.validateToken(token)
  if (_.isEmpty(tokenResult)) {
    res.send({
      statusCode: httpStatusCode.clientError.UNAUTHORIZED,
      message: errorLang.message.USER_NOT_AUTHENTICATED,
    })
  }
  const result = await groupController.createGroup(req.body, tokenResult)
  console.log('RouterResult---->', result)
  res.send(result)
})
export default groupRouter
