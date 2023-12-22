import express from 'express';

const splitExpenseRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Split Expense
 *     description: Operations related to expenses
 * paths:
 *   /api/split-expenses:
 *     get:
 *       summary: Split Expense
 *       description: Retrieve a list of all expenses
 *       tags:
 *         - Split Expense
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Split Expense retrieved successfully
 */
splitExpenseRouter.get('/expenses', (req, res) => {
  res.send('Get all expenses');
});

export default splitExpenseRouter;
 