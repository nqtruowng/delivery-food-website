import chatModel from "../models/chatModel.js"

export const createChat = async (req, res) => {
  const newChat = new chatModel({
    members: [req.params.senderId, req.params.receiverId]
  })
  try {
    const result = await newChat.save()
    res.status(200).json({message: true, result})
  } catch (error) {
    res.status(500).json({message: false, error})
  }
}

export const userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: {$in: [req.params.userId]}
    })
    res.status(200).json({message: true, chat})
  } catch (error) {
    res.status(500).json({message: false, error})
  }
}

export const findChat = async (req, res) => {
  try {
    const chat= await chatModel.findOne({
      members: {$all: [req.params.firstId, req.params.secondId]}
    })
    res.status(200).json({message: true, chat})
  } catch (error) {
    res.status(500).json({message: false, error})
  }
}