import mongoose, { Types } from 'mongoose'
import { IExpense, IUpdateExpense } from '../interface/expenseInterface'
import { updateGroupExpense, moveExpenseId } from './groupModel'
import _ from 'lodash'
const { v4: uuidv4 } = require('uuid')
interface IExpenseModel extends IExpense, Document {}
const expenseSchema = new mongoose.Schema<IExpenseModel>({
  _id: {
    type: String,
    default: uuidv4,
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
    const result: any = await updateGroupExpense(
      expenseData.groupId,
      expenseId.id,
    )
    return result.modifiedCount
  } catch (error) {
    console.log(error)
    throw error
  }
}
const updateExpense = async (
  name: string,
  creditorShare: number,
  borrower: IUpdateExpense['borrower'],
  total: number,
  expenseId: string,
  userId: string,
) => {
  try {
    const updateData = {
      $set: {
        name,
        creditorShare,
        borrower,
        total,
        updatedAt: new Date(),
      },
    }
    const result = await expenseModel.updateOne(
      { $and: [{ _id: expenseId }, { creditor: userId }, { settled: false }] },
      updateData,
    )
    return _.get(result, 'modifiedCount')
  } catch (error) {
    console.info(error)
    throw error
  }
}
const deleteExpense = async (
  groupId: string,
  expenseId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const result = await expenseModel.updateOne(
      { $and: [{ _id: expenseId }, { creditor: userId }] },
      { $set: { settled: true } },
    )
    if (result.modifiedCount > 0) {
      const updateGroup = await moveExpenseId(expenseId, groupId)
      if (updateGroup) return true
    }
    return false
  } catch (error) {
    throw error
  }
}
export { expenseModel, addExpense, updateExpense, deleteExpense }
