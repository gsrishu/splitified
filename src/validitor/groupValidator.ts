import * as Joi from 'joi'
import { IGroup } from '../interface/GroupInterface'

export const createGroupValidator = Joi.object<IGroup>({
  groupName: Joi.string().required().min(3),
})

export const addMemberValiditor = Joi.object({
  members: Joi.array().items(Joi.string()).min(1),
  groupId: Joi.string().required(),
})
