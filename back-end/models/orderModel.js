import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {type: String, require: true},
    items: {type: Array, require: true},
    amount: {type:Number, require: true},
    address: {type: String, require: true},
    status:{type: String, default: 'Food processing'},
    date: {type: Date, default: Date.now()},
    payment:{type: Boolean, default:false},
    name: {type: String, default: ''},
    phone: {type: String, default: ''}
})

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel
