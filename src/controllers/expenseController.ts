import { IExpense } from '../interface/expenseInterface'
import { httpStatusCode } from '../response'
import { expenseValidator } from '../validitor/expenseValidator'
import { ExpenseService } from '../services/expenseService'
export class ExpenseController {
  static async addExpense(request: IExpense) {
    const { error } =  expenseValidator.validate(request)
    if (error) {
      return {
        statusCode:httpStatusCode.clientError.BAD_REQUEST,
        message:error.details[0].message
      }
    }
    return ExpenseService.addExpense(request)
  }
}
