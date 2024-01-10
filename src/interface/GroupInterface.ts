import { ObjectId } from 'mongoose'
export interface IGroup {
  _id?: string
  groupName: string
  admin: string
  members?: string[]
  expenses?: string[]
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
export interface Imembers{
    members:string[]
    groupId:string
}
