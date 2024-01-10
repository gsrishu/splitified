import { ObjectId } from "mongoose"
import { IDate } from "./CommonInterface"
export interface IExpense extends IDate{
 _id?: string
  groupId: string
  name: string
  creditor: string
  creditorShare:number
  borrower: {
    userId: string
    share: number
  }[]
  total: number
  settled:boolean
}
