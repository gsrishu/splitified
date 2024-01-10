import mongoose, { Types } from 'mongoose'
import { IExpense } from '../interface/expenseInterface'
import { updateExpense } from './groupModel'
const { v4: uuidv4 } = require('uuid')
interface IExpenseModel extends IExpense, Document {}
const expenseSchema = new mongoose.Schema<IExpenseModel>({
  _id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  creditor: {
    type: String,
    required: true,
  },
  creditorShare: {
    type: Number,
    required: true,
  },
  borrower: [
    {
      userId: {
        type: String,
        required: true,
      },
      share: {
        type: Number,
        required: true,
      },
      _id: false,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  settled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})
const expenseModel = mongoose.model<IExpenseModel>('Expense', expenseSchema)

const addExpense = async (expenseData: IExpense) => {
  try {
    const expenseId = await expenseModel.create(expenseData)
    const result = await updateExpense(expenseData.groupId, expenseId.id)
    return result.modifiedCount
  } catch (error) {
    console.log(error)
    throw error
  }
}
export { expenseModel, addExpense }
