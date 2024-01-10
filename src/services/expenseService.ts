import { IGroup } from '../interface/GroupInterface'
import { IExpense } from '../interface/expenseInterface'
import { getGroupData } from '../models/groupModel'
import { returnFunction } from '../util'
import _ from 'lodash'
import { httpStatusCode, successResponse, errorLang } from '../response'
import { addExpense as addExpenseModel } from '../models/expenseModel'
export class ExpenseService {
  static async addExpense(request: IExpense) {
    try {
      const groupId: IGroup = (await getGroupData(
        request.groupId.toString(),
      )) as IGroup

      if (_.isEmpty(groupId)) {
        return returnFunction(
          httpStatusCode.clientError.BAD_REQUEST,
          true,
          errorLang.message.NOT_VALID_GROUP,
        )
      }

      const {
        borrower: expenseMembers,
        creditor,
        total,
        creditorShare,
      } = request
      const groupMembers: string[] = [groupId.admin, ...(groupId.members || [])]
      const filterMember = expenseMembers.filter(
        (member) =>
          !groupMembers.includes(member.userId) || member.userId == creditor,
      )
      if (!_.isEmpty(filterMember) || !groupMembers.includes(creditor)) {
        return returnFunction(
          httpStatusCode.clientError.BAD_REQUEST,
          true,
          errorLang.message.INVALID_EXPENSE_MEMBERS,
        )
      }

      const totalExpense = expenseMembers.reduce(
        (sum, member) => (sum += member.share),
        0,
      )

      if (totalExpense + creditorShare !== total) {
        return returnFunction(
          httpStatusCode.clientError.BAD_REQUEST,
          true,
          errorLang.message.TOTAL_NOT_EQUAL_TO_SHARES,
        )
      }
      const result: any = await addExpenseModel(request)

      return result
        ? returnFunction(
            httpStatusCode.success.CREATED,
            true,
            successResponse.message.ADD_EXPENSE_SUCCESS,
          )
        : returnFunction(
            httpStatusCode.serverError.INTERNAL_SERVER_ERROR,
            false,
            errorLang.message.ADD_EXPENSE_FAILED,
          )
    } catch (error) {
      return error
    }
  }
}
