import express from 'express';

const expenseRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Expenses
 *     description: Operations related to expenses
 * paths:
 *   /api/expenses:
 *     get:
 *       summary: Get all expenses
 *       description: Retrieve a list of all expenses
 *       tags:
 *         - Expenses
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Expenses retrieved successfully
 */
expenseRouter.get('/expenses', (req, res) => {
  res.send('Get all expenses');
});

export default expenseRouter;
 