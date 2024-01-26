import {
  IExpense,
  IUpdateExpense,
  IDeleteExpense,
} from '../interface/expenseInterface'
import {
  expenseValidator,
  updateExpenseValidator,
  deleteExpenseValiditor,
} from '../validitor/expenseValidator'
import { ExpenseService } from '../services/expenseService'
import { validateReturn } from '../util/index'
export class ExpenseController {
  static async addExpense(request: IExpense) {
    const { error } = expenseValidator.validate(request)
    if (error) return validateReturn(error)

    return ExpenseService.addExpense(request)
  }
  static async updateExpense(request: IUpdateExpense, userId: string) {
    const { error } = updateExpenseValidator.validate(request)
    if (error) return validateReturn(error)

    return ExpenseService.updateExpense(request, userId)
  }
  static deleteExpense(request: IDeleteExpense) {
    const { error } = deleteExpenseValiditor.validate(request)
    if (error) return validateReturn(error)

    return ExpenseService.deleteExpense(request)
  }
}
