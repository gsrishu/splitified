import {
  isGroupExists,
  createGroup as createGroupModel,
} from '../models/groupModel'
import _ from 'lodash'
import { IReturn } from '../interface/CommonInterface'
import {
  successResponse,
  httpStatusCode,
  errorLang,
  splitifiedError,
} from '../response/index'
import { getUserId } from '../models/userModel'
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
}
