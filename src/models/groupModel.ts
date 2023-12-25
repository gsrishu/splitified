import mongoose, { ObjectId, Schema, Types } from 'mongoose'
import { IGroup } from '../interface/GroupInterface'
const groupSchema: Schema<IGroup> = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  groupName: {
    type: String,
    required: true,
  },
  admin: {
    type: Types.ObjectId,
    require: true,
  },
  members: [
    {
      type: Types.ObjectId,
      default: [],
    },
  ],
  expenses: [
    {
      type: Types.ObjectId,
      default: [],
    },
  ],
  isActive: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

const groupModel = mongoose.model<IGroup>('group', groupSchema)

const isGroupExists = async (
  groupName: string,
  admin: Types.ObjectId,
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
const createGroup = async (groupName: string, admin: Types.ObjectId) => {
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

export { groupModel, createGroup, isGroupExists }
