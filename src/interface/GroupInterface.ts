import { ObjectId } from 'mongoose'
export interface IGroup {
  _id?: ObjectId
  groupName: string
  admin: ObjectId
  members?: ObjectId[]
  expenses?: ObjectId[]
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
