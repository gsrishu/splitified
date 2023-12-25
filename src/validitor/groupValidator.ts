import * as Joi from 'joi'
import { IGroup } from '../interface/GroupInterface'

export const createGroupValidator = Joi.object<IGroup>({
    groupName:Joi.string().required().min(3),
})
