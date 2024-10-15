import exprees from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
// import userRouter from './routes/userRoutes.js'

dotenv.config()
const app = exprees()
const port = process.env.PORT

//connect database
connectDB()

//api endpoint
//food
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    next()
})

app.use('/api/food', foodRouter)
app.use('/images', exprees.static('uploads'))

//user
// app.use('/api/user', userRouter)

app.use(cors())

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log(`Server Start On http://localhost:${port}`)
})
    
