import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/expenses', (req, res) => {
  // Controller logic...
  res.send('Get all expenses');
});

export default router;
