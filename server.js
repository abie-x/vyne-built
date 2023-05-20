import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurentRoutes.js'

//configuring the dotenv file
dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})