import { GroupService } from '../services/groupService'
import { IGroup, IDeleteGroup } from '../interface/GroupInterface'
import {
  createGroupValidator,
  deleteMemberValiditor,
  getAllGroupValiditor,
} from '../validitor/groupValidator'
import { httpStatusCode } from '../response'
import { validateReturn } from '../util/index'
export class groupController {
  static async createGroup(request: IGroup, tokenData: any) {
    const { error } = createGroupValidator.validate(request)
    if (error) {
      return validateReturn(error)
    } else {
      const groupName = request.groupName
      const userName = tokenData.userName
      return await GroupService.createGroup(groupName, userName)
    }
  }

  static async deleteGroup(request: IDeleteGroup, tokenData: any) {
    const { groupId } = request
    console.log('groupIdgroupId', groupId, tokenData)
    const userId = tokenData.userId
    const { error } = deleteMemberValiditor.validate({ groupId })
    if (error) {
      return validateReturn(error)
    }
    const result = await GroupService.deleteGroup(groupId, userId)
    return result
  }

  static async getAllGroup(tokenData: any) {
    const { userId } = tokenData
    const { error } = getAllGroupValiditor.validate({ userId })
    if (error) {
      return validateReturn(error)
    }
    const result = GroupService.getAllGroup(userId)

    return result
  }
}
