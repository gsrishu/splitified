import express from 'express'
const userRouter = express.Router()
import { UserController } from '../controllers/userController'
userRouter.post('/login', async (req, res) => {
  const { userName, password } = req.body
  const result = await UserController.login({ userName, password })
  res.send(result)
})
userRouter.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body
  const result = await UserController.signUp({ userName, email, password })
  res.send(result)
})
export default userRouter
