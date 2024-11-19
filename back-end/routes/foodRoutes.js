import express from 'express'
import multer from 'multer'

import { addFood, listFood, removeFood, updatePrice, listFoodWithCondition } from '../controllers/foodController.js'

const foodRouter = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer ({ storage: storage })

foodRouter.post('/add',upload.single('image'), addFood)
foodRouter.get('/list', listFood)
foodRouter.get('/listfood/:name', listFoodWithCondition)
foodRouter.delete('/remove/:id', removeFood)
foodRouter.post('/update/:id', updatePrice)

export default foodRouter