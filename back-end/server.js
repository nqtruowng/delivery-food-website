import exprees from 'express'
import cors from 'cors'

import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'


const app = exprees()
const port = 4000

//connect database
connectDB()

//api endpoint
app.use('/api/food', foodRouter)
app.use('/images', exprees.static('uploads'))

app.use(exprees.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => {
    console.log(`Server Start On hhtp://localhost:${port}`)
})
