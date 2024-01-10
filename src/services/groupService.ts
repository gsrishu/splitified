import {
  isGroupExists,
  createGroup as createGroupModel,
  getGroupData,
  updateMember,
  groupModel,
} from '../models/groupModel'
import _ from 'lodash'
import { IReturn } from '../interface/CommonInterface'
import {
  successResponse,
  httpStatusCode,
  errorLang,
  splitifiedError,
} from '../response/index'
import { getUserId, getMember } from '../models/userModel'
import { IGroup } from '../interface/GroupInterface'
export class GroupService {
  static async createGroup(
    groupName: string,
    userId: string,
  ): Promise<IReturn> {
    try {
      const getAdmin = await getUserId(userId)
      if (!getAdmin) {
        return {
          statusCode: httpStatusCode.clientError.CONFLICT,
          success: false,
          message: errorLang.message.USER_NOT_FOUND,
        }
      }
      const groupExist = await isGroupExists(groupName, getAdmin)
      if (!groupExist) {
        const createGroup = await createGroupModel(groupName, getAdmin)
        if (!_.isEmpty(createGroup)) {
          return {
            statusCode: httpStatusCode.success.CREATED,
            success: true,
            message: successResponse.message.GROUP_CREATED_SUCCESSFULLY,
          }
        }
      }
      return {
        statusCode: httpStatusCode.clientError.CONFLICT,
        success: false,
        message: errorLang.message.GROUP_ALREADY_EXISTS,
      }
    } catch (error: any) {
      const customError = new splitifiedError(
        error.message,
        error.code,
        errorLang.process.createGroup,
        errorLang.service.groupService,
      )
      console.info(customError)
      throw error
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
        errorLang.service.groupService,
        errorLang.service.groupService,
      )
      console.info(errorDetails)
      return await errorLang.commonErrorReturn()
    }
  }
}
