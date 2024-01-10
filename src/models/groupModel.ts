import mongoose, { Schema, Types } from 'mongoose'
import { IGroup } from '../interface/GroupInterface'
import _ from 'lodash'
const { v4: uuidv4 } = require('uuid')
const groupSchema: Schema<IGroup> = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    require: true,
  },
  members: [
    {
      type: String,
      default: [],
    },
  ],
  expenses: [
    {
      type: String,
      default: [],
    },
  ],
  settle: [
    {
      type: String,
      default: [],
    },
  ],
  isActive: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const groupModel = mongoose.model<IGroup>('group', groupSchema)

const isGroupExists = async (
  groupName: string,
  admin: string,
): Promise<boolean> => {
  try {
    const groupExists = await groupModel.findOne({
      $and: [{ groupName: groupName }, { admin: admin }, { isActive: true }],
    })
    return !!groupExists
  } catch (error) {
    throw error
  }
}
const createGroup = async (groupName: string, admin: string) => {
  try {
    const groupData = new groupModel({
      groupName: groupName,
      admin: admin,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const result = await groupData.save()
    return result
  } catch (error) {
    throw error
  }
}

const getGroupData = async (groupId: string) => {
  try {
    const groupInfo = await groupModel.findOne({
      _id: groupId,
    })
    if (!_.isEmpty(groupInfo)) {
      return groupInfo
    }
  } catch (error) {
    return error
  }
}
const updateMember = async (members: string[], groupId: string) => {
  try {
    const result = await groupModel.updateOne(
      { _id: groupId },
      { $set: { members: members } },
    )

    return result.modifiedCount
  } catch (error) {
    throw error
  }
}
const updateExpense = async (groupId: string, expenseId: string) => {
  try {
    const selectGroup = await groupModel
      .findOne({ _id: groupId })
      .select('expenses')
    const expenseArray = selectGroup?.expenses || []
    expenseArray.push(expenseId)
    const updateGroup = await groupModel.updateOne(
      { _id: groupId },
      { $set: { expenses: expenseArray } },
    )
    return updateGroup
  } catch (error) {
    throw error
  }
}
export {
  groupModel,
  createGroup,
  isGroupExists,
  getGroupData,
  updateMember,
  updateExpense,
}
