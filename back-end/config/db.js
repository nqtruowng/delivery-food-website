import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nguyenquangtruong:minions26012003@cluster0.9wnn1.mongodb.net/delivery_food').then(() => {
        console.log('db connected');  
    })
}