import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, require:true},
    password: {type: String, require: true},
    role: {type: String, require: true, default: 'user'},
    cartData: {type: Object, default: {}},
    token: {type: String, default: ''}
})

const userModel = mongoose.model('users', userSchema)

export default userModel