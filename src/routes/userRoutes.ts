import express from 'express'
const userRouter = express.Router()
import { userSignUp } from '../validitor/userValidation'
import { UserController } from '../controllers/userController';
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to User
 * paths:
 *   /user/login:
 *     get:
 *       summary: Get one user
 *       description: Retrieve a user
 *       tags:
 *         - User
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: User retrieved successfully
 *   /user/signup:
 *     post:
 *       summary: Create a new user
 *       description: Register a new user
 *       tags:
 *         - User
 *       requestBody:
 *         description: User data
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               required:
 *                 - userName
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: User created successfully
 */
userRouter.get('/login', (req, res) => {
  res.send('Login successfull')
})
userRouter.post('/signup', async(req, res) => {
  const { userName, email, password } = req.body
  const result =  await UserController.signUp({userName, email, password }) 
  res.send(result)
})
export default userRouter
