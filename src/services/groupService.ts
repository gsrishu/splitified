import {
  isGroupExists,
  createGroup as createGroupModel,
  getGroupData,
  deleteGroup,
  listGroup,
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

  static async deleteGroup(groupId: string, userId: string) {
    try {
      const groupInfo = (await getGroupData(groupId)) as IGroup

      if (_.isEmpty(groupInfo)) {
        return {
          statusCode: httpStatusCode.success.NO_CONTENT,
          success: true,
          message: errorLang.message.NOT_VALID_GROUP,
        }
      }
      const isSettled = groupInfo.members?.length === groupInfo.settle?.length

      if (!isSettled) {
        return {
          statusCode: httpStatusCode.success.NO_CONTENT,
          success: false,
          message: errorLang.message.NOT_EVERY_MEMBER_SETTLED_ON_THE_GROUP,
        }
      }

      const result = await deleteGroup(groupId)

      return result
        ? {
            statusCode: httpStatusCode.success.OK,
            success: true,
            message: successResponse.message.GROUP_DELETED,
          }
        : {
            statusCode: httpStatusCode.serverError.INTERNAL_SERVER_ERROR,
            success: false,
            message: errorLang.message.DELETE_GROUP_ERROR,
          }
    } catch (error:any) {
      const customError = new splitifiedError(
        error.message,
        error.code,
        errorLang.process.deleteGroup,
        errorLang.service.groupService,
      )
      console.info(customError)
  }
}

  static async getAllGroup(userId: string) {
    try {
      const checkValidUserId = await getMember(userId)
      if (_.isEmpty(checkValidUserId)) {
        return {
          statusCode: httpStatusCode.clientError.BAD_REQUEST,
          success: true,
          message: errorLang.message.USER_NOT_FOUND,
        }
      }

      const allGroup = await listGroup(userId)
      return allGroup
    } catch (error:any) {
      const customError = new splitifiedError(
        error.message,
        error.code,
        errorLang.process.getAllGroup,
        errorLang.service.groupService,
      )
      console.info(customError)
      throw error
    }
    }
  }

