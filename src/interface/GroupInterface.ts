export interface IGroup {
  _id?: string
  groupName: string
  admin: string
  members?: string[]
  expenses?: string[]
  settle?: string[]
  settledExpense?: string[]
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}
export interface Imembers {
  members: string[]
  groupId: string
}

export interface IDeleteGroup {
  groupId: string
}
