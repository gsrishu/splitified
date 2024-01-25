import * as Joi from 'joi'
import { IExpense } from '../interface/expenseInterface'
export const expenseValidator = Joi.object<IExpense>({
  groupId: Joi.string().required(),
  name: Joi.string().required(),
  creditor: Joi.string().required(),
  creditorShare: Joi.number().required().strict(true),
  borrower: Joi.array()
    .items({
      userId: Joi.string().required(),
      share: Joi.number().strict(true).required(),
    })
    .required()
    .min(1),
  total: Joi.number().strict(true).required(),
})

export const updateExpenseValidator = Joi.object({
  expenseId:Joi.string().required(),
  name: Joi.string().required(),
  creditorShare: Joi.number().required().strict(true),
  borrower: Joi.array()
    .items({
      userId: Joi.string().required(),
      share: Joi.number().strict(true).required(),
    })
    .required()
    .min(1),
  total: Joi.number().strict(true).required(),
})
