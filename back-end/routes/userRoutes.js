import express from 'express'

import { listUser, loginUser, registerUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login/:admin', loginUser)
userRouter.post('/login', loginUser)
userRouter.get('/list', listUser)

export default userRouter