import {
  isGroupExists,
  createGroup as createGroupModel,
  getGroupData,
  updateMember,
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
  static async addMembers(members: string[], userId: string, groupId: string) {
    try {
      const filterMember = await Promise.all(
        members.map(async (member) => {
          const result = await getMember(member)

          return result ? result : null
        }),
      )
      const validMembers: any = filterMember.filter((member) => member !== null)
      const groupInfo = (await getGroupData(groupId)) as IGroup
      if (groupInfo) {
        let removeDuplicateMember = validMembers.filter((members: any) => {
          return groupInfo.members && !groupInfo.members.includes(members)
        })
        if (_.isEmpty(removeDuplicateMember)) {
          return {
            statusCode: httpStatusCode.clientError.BAD_REQUEST,
            success: true,
            message: errorLang.message.MEMBERS_ALREADY_EXISTS,
          }
        }
        removeDuplicateMember = [
          ...removeDuplicateMember,
          ...(groupInfo.members || []),
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
      }
    } catch (error: any) {
      const errorInfo = new splitifiedError(
        error.message,
        error.code,
        errorLang.process.addMembers,
        errorLang.service.groupService,
      )
      console.info(errorInfo)
      return errorInfo
    }
  }
}
