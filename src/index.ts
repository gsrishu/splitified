import { swaggerUi, specs } from '../swagger/swaggerConfig';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/my_expense_db', {});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Other middleware...

// Include your routes
import expenseRoutes from '../src/routes/expenseRoutes';
app.use('/api', expenseRoutes);
