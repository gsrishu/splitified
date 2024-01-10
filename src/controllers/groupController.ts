import { GroupService } from '../services/groupService'
import { IGroup, IDeleteGroup } from '../interface/GroupInterface'
import {
  createGroupValidator,
  deleteMemberValiditor,
} from '../validitor/groupValidator'
import { httpStatusCode } from '../response'

export class groupController {
  static async createGroup(request: IGroup, tokenData: any) {
    const { error } = createGroupValidator.validate(request)
    if (error) {
      return {
        statusCode: httpStatusCode.clientError.BAD_REQUEST,
        message: error.details[0].message,
      }
    } else {
      const groupName = request.groupName
      const userName = tokenData.userName
      return await GroupService.createGroup(groupName, userName)
    }
  }

  static async deleteGroup(request: IDeleteGroup) {
    const { groupId, memberId } = request
    const { error } = deleteMemberValiditor.validate({ groupId, memberId })
    return error
  }
}

