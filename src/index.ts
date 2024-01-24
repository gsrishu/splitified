import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
const swagger = require('../swagger/swaggerConfig')
import expenseRoutes from '../src/routes/expenseRoutes'
import userRouter from '../src/routes/userRoutes'
import groupRouter from '../src/routes/groupRoutes'
import memberRouter from './routes/memberRouter';
const app = express()
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/splitwise')

app.use(bodyParser.json())
app.use('/expense', expenseRoutes)
app.use('/user', userRouter)
app.use('/group',groupRouter)
app.use('/member',memberRouter)
swagger(app)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Swagger Docs URL: http://localhost:${port}/splitified`)
})
