import { getGroupData, updateMember, memberList } from '../models/groupModel'
import _ from 'lodash'
import {
  successResponse,
  httpStatusCode,
  errorLang,
  splitifiedError,
} from '../response/index'
import { getMember } from '../models/userModel'
import { IGroup } from '../interface/GroupInterface'
export class MemberService {
  static async addMembers(members: string[], userId: string, groupId: string) {
    try {
      const validMembers: any = await this.checkValidMembers(members)
      let removeDuplicateMember: any = await this.getGroupInfo(
        groupId,
        validMembers,
      )
      if (removeDuplicateMember === false) {
        return {
          statusCode: httpStatusCode.clientError.BAD_REQUEST,
          success: true,
          message: errorLang.message.MEMBERS_ALREADY_EXISTS,
        }
      }
      removeDuplicateMember = [
        ...removeDuplicateMember.members,
        ...(removeDuplicateMember.group.members || []),
      ]
      const insertMember = await updateMember(removeDuplicateMember, groupId)

      if (insertMember > 0) {
        return {
          statusCode: httpStatusCode.success.OK,
          success: true,
          message:
            successResponse.message.MEMBER_ADDED_SUCCESSFULLY(insertMember),
        }
      }

      return {
        statusCode: httpStatusCode.serverError.SERVICE_UNAVAILABLE,
        success: false,
        message: errorLang.message.UNABLE_TO_UPDATE_MEMBER,
      }
    } catch (error: any) {
      const errorInfo = new splitifiedError(
        error.message,
        error.code,
        errorLang.process.addMembers,
        errorLang.service.groupService,
      )
      console.info(errorInfo)
      return errorLang.commonErrorReturn()
    }
  }
  static async checkValidMembers(members: string[]) {
    const filterMember = await Promise.all(
      members.map(async (member) => {
        const result = await getMember(member)

        return result ? result : null
      }),
    )
    const validMembers = filterMember.filter((member) => member !== null)
    return validMembers
  }
  static async getGroupInfo(groupId: string, validMembers: string[]) {
    const groupInfo = (await getGroupData(groupId)) as IGroup
    if (groupInfo) {
      let removeDuplicateMember = validMembers.filter((members: any) => {
        return groupInfo.members && !groupInfo.members.includes(members)
      })
      if (_.isEmpty(removeDuplicateMember)) {
        return false
      }
      return { members: removeDuplicateMember, group: groupInfo }
    }
  }
  static async deleteMember(members: string[], groupId: string) {
    /** Todo: chack the member borrow to someone if no then the admin can delete the member*/
    try {
      const validMembers = await this.checkValidMembers(members)
      const getGroupInfo: any = await getGroupData(groupId)
      const filterData = Array.isArray(getGroupInfo.members)
        ? getGroupInfo.members.filter(
            (member: any) => member.toString() !== validMembers[0]?.toString(),
          )
        : []
      if (filterData.length < getGroupInfo.members.length) {
        const result = await updateMember(filterData, groupId)
        if (result > 0) {
          return {
            statusCode: httpStatusCode.success.OK,
            success: true,
            message:
              successResponse.message.MEMBER_DELETED_SUCCESSFULLY(result),
          }
        }
      }
      return {
        statusCode: httpStatusCode.clientError.NOT_FOUND,
        success: false,
        message: errorLang.message.NO_MEMBER_AVAILABLE_TO_DELETE,
      }
    } catch (error: any) {
      const errorDetails = new splitifiedError(
        error.message,
        error.statusCode,
        errorLang.service.memberService,
        errorLang.process.deleteMember,
      )
      console.info(errorDetails)
      return await errorLang.commonErrorReturn()
    }
  }
  static async getAllMember(groupId: string) {
    try {
      const allmembers = memberList(groupId)
      return allmembers
    } catch (error: any) {
      const errorDetails = new splitifiedError(
        error.message,
        error.statusCode,
        errorLang.process.getAllMember,
        errorLang.service.memberService,
      )
      console.info(errorDetails)
      return await errorLang.commonErrorReturn()
    }
  }
}
