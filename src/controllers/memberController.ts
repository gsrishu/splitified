import { MemberService } from '../services/memberService'
import { Imembers } from '../interface/GroupInterface'
import { addMemberValiditor } from '../validitor/groupValidator'
import { httpStatusCode } from '../response'
export class MemberController {
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
      return await MemberService.addMembers(members, userName, groupId)
    }
  }

  static async deleteMember(request: Imembers) {
    const { error } = addMemberValiditor.validate(request)
    if (error) {
      return {
        statusCode: httpStatusCode.clientError.BAD_REQUEST,
        message: error.details[0].message,
      }
    }
    const members = request.members
    const groupId = request.groupId
    return await MemberService.deleteMember(members, groupId)
  }
}
