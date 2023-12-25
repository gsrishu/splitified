import { GroupService } from '../services/groupService'
import { IGroup } from '../interface/GroupInterface'
import { createGroupValidator } from '../validitor/groupValidator'

export class groupController {
  static async createGroup(request: IGroup, tokenData: any) {
    const { error } = createGroupValidator.validate(request)
    if (error) {
      return error.details[0].message
    } else {
      const groupName = request.groupName
      const userName = tokenData.userName
      return await GroupService.createGroup(groupName,userName)
    }
  }
}
