import { MemberService } from '../services/memberService'
import { Imembers } from '../interface/GroupInterface'
import {
  addMemberValiditor,
  getAllMemberValidator,
} from '../validitor/groupValidator'
import { validateReturn } from '../util/index'
export class MemberController {
  static async addMembers(request: Imembers, tokenData: any) {
    const { error } = addMemberValiditor.validate(request)
    if (error) {
      return validateReturn(error)
    } else {
      const members = request.members
      const userId = tokenData.userId
      const groupId = request.groupId
      return await MemberService.addMembers(members, userId, groupId)
    }
  }

  static async deleteMember(request: Imembers) {
    const { error } = addMemberValiditor.validate(request)
    if (error) {
      return validateReturn(error)
    }
    const members = request.members
    const groupId = request.groupId
    return await MemberService.deleteMember(members, groupId)
  }
  static async getAllMember(groupId:string) {
    const { error } = getAllMemberValidator.validate({groupId})
    if (error) {
      return validateReturn(error)
    }
    return await MemberService.getAllMember(groupId)
  }
}
