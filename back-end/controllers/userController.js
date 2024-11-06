import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import userModel from '../models/userModel.js'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userModel.findOne({ username })
        if (!user) {
            return res.json({
                success: false,
                message: 'User does not exist !',
            })
        }

        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }

        const token = createToken(user._id)
        res.json({ success: true, token, user })
    } catch (error) {
        res.json({ success: false, message: 'Error' })
    }
}

export const registerUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const exist = await userModel.findOne({ username })
        if (exist) {
            return res.json({ success: false, message: 'User already exist' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            username: username,
            password: hashPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        res.json({ success: false, message: error })
    }
}

export const listUser = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'user' })
        res.json({ success: true, data: users })
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: 'error' })
    }
}
