import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            name: req.body.name,
            phone: req.body.phone
        })
        await newOrder.save()        
        
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'USD',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 110
            },
            quantity: item.amount
        }))

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
            locale: 'en'
        })

        res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error);
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    console.log(orderId, success);
    
    try {
        if(success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            res.json({success: true, message: "paid"})
        } else {
            await orderModel.findOneAndDelete(orderId)
            res.json({success: false, message: "cancel"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "error"})
    }
}

export const userOrders = async (req, res) => {
    const { userId } = req.params
    try {
        const orders = await orderModel.find({userId, payment: true}).sort({date: -1})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "error"})
    }
}

export const listOrders = async (req, res) => {
    const { year } = req.params
    
    if (year) {
        const startOfYear = new Date(`${year}-01-01T00:00:00Z`)
        const endOfYear = new Date(`${year}-12-31T23:59:59Z`)

        try {
            const orders = await orderModel.find({date: { $gte: startOfYear, $lte: endOfYear }})
            res.json({success: true, data: orders})
        } catch (error) {
            console.log(error)
            res.json({success:false, message: error})
        }
    } else {
        try {
            const orders = await orderModel.find({payment: true}).sort({date: -1})
            res.json({success: true, data: orders})
        } catch (error) {
            console.log(error)
            res.json({success:false, message: error})
        }
    }
    
}

export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: "Status update"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: " error"})
    }
}