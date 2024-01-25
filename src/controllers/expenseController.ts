import { IExpense } from '../interface/expenseInterface'
import { httpStatusCode } from '../response'
import {
  expenseValidator,
  updateExpenseValidator,
} from '../validitor/expenseValidator'
import { ExpenseService } from '../services/expenseService'
import { validateReturn } from '../util/index'
export class ExpenseController {
  static async addExpense(request: IExpense) {
    const { error } = expenseValidator.validate(request)
    if (error) {
      return validateReturn(error)
    }
    return ExpenseService.addExpense(request)
  }
  static async updateExpense(request: any, userId: string) {
    const { error } = updateExpenseValidator.validate(request)
    if (error) {
      return validateReturn(error)
    }
    return ExpenseService.updateExpense(request, userId)
  }
}
