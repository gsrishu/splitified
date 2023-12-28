import { GroupService } from '../services/groupService'
import { IGroup, Imembers } from '../interface/GroupInterface'
import {
  createGroupValidator,
  addMemberValiditor,
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

  static async addMembers(request: Imembers, tokenData: any) {
    const { error } = addMemberValiditor.validate(request)
    if (error) {
      return {
        statusCode: httpStatusCode.clientError.BAD_REQUEST,
        message: error.details[0].message,
      }
    } else {
      const members = request.members
      const userName = tokenData.userName
      const groupId = request.groupId
      return await GroupService.addMembers(members, userName, groupId)
    }
  }
}
