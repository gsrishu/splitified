import express from 'express'
import { validateTokenMiddleware } from '../authentication/validateToken'
import { MemberController } from '../controllers/memberController'
const memberRouter = express.Router()

memberRouter.post(
  '/add-member',
  validateTokenMiddleware,
  async (req: any, res) => {
    const result = await MemberController.addMembers(req.body, req.tokenResult)
    res.send(result)
  },
)

memberRouter.post(
  '/delete-member',
  validateTokenMiddleware,
  async (req: any, res) => {
    const result = await MemberController.deleteMember(req.body)
    res.send(result)
  },
)
memberRouter.get(
  '/get-all-member',
  validateTokenMiddleware,
  async (req: any, res) => {
    const { groupId } = req.query
    const result = await MemberController.getAllMember(groupId)
    res.send(result)
  },
)
export default memberRouter
