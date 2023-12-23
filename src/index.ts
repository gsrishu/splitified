import express from 'express'
import mongoose from 'mongoose'
const swagger = require('../swagger/swaggerConfig')
import expenseRoutes from '../src/routes/expenseRoutes'
import userRouter from '../src/routes/userRoutes'
const app = express()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/splitwise')

app.use(bodyParser.json())
app.use('/expense', expenseRoutes)
app.use('/user', userRouter)
swagger(app)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Swagger Docs URL: http://localhost:${port}/splitwise`)
})
