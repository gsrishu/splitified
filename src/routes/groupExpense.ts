import express from 'express';

const groupExpenseRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Group Expense
 *     description: Operations related to expenses
 * paths:
 *   /api/group-expenses:
 *     get:
 *       summary: Group Expense
 *       description: Retrieve a list of all expenses
 *       tags:
 *         -  Group Expense
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message:  Group Expense retrieved successfully
 */
groupExpenseRouter.get('/expenses', (req, res) => {
  res.send('Get all expenses');
});

export default groupExpenseRouter;
 