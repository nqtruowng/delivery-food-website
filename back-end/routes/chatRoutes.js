import express from 'express'

import { createChat, userChats, findChat } from '../controllers/chatController.js'

const chatRouter = express.Router()

chatRouter.post('/:senderId/:receiverId', createChat)
chatRouter.get('/:userId', userChats)
chatRouter.get('/find/:firstId/:secondId', findChat)

export default chatRouter