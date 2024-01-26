import express from 'express'
import { validateTokenMiddleware } from './groupRoutes'
import { ExpenseController } from '../controllers/expenseController'
const expenseRouter = express.Router()
expenseRouter.get('/expenses', (req, res) => {
  res.send('Get all expenses')
})

expenseRouter.post(
  '/add-expense',
  validateTokenMiddleware,
  async (req: any, res) => {
    const result = await ExpenseController.addExpense(req.body)
    res.send(result)
  },
)

expenseRouter.post('/update-expense', async (req: any, res) => {
  const { userId } = req.tokenResult
  const result = await ExpenseController.updateExpense(req.body, userId)
  res.send(result)
})
expenseRouter.post(
  '/delete-expense',
  validateTokenMiddleware,
  async (req: any, res) => {
    const { userId } = req.tokenResult
    const result = await ExpenseController.deleteExpense({
      ...req.body,
      userId,
    })
    res.send(result)
  },
)

export default expenseRouter
