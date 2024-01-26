import { StringMappingType } from 'typescript'
import { IDate } from './CommonInterface'
export interface IExpense extends IDate {
  _id?: string
  groupId: string
  name: string
  creditor: string
  creditorShare: number
  borrower: {
    userId: string
    share: number
  }[]
  total: number
  settled: boolean
}
export interface IUpdateExpense {
  expenseId: string
  name: string
  creditorShare: number
  borrower: {
    userId: string
    share: number
  }[]
  total: number
}
export interface IDeleteExpense {
  expenseId: string
  groupId: string
  userId: string
}
