import express from 'express';

const groupExpenseRouter = express.Router();
groupExpenseRouter.get('/expenses', (req, res) => {
  res.send('Get all expenses');
});

export default groupExpenseRouter;
 