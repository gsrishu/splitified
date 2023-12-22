import express from 'express';
import mongoose from 'mongoose';
import { swaggerUi, specs } from '../swagger/swaggerConfig';
import expenseRoutes from '../src/routes/expenseRoutes';
import userRouter from '../src/routes/userRoutes'

const app = express();
mongoose.connect('mongodb://localhost:27017/splitwise');
app.use('/splitwise', swaggerUi.serve, swaggerUi.setup(specs));

// Other middleware...

// Include your routes

app.use('/expense', expenseRoutes);
app.use('/user',userRouter);

// Other configurations and middleware...

const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Swagger Docs URL: http://localhost:${port}/splitwise`);
  });