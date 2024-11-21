import express from "express";
import { listOrders, placeOrder, userOrders, updateStatus, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router()

orderRouter.post('/place',authMiddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.get('/userorders/:userId', userOrders)
orderRouter.get('/list/:year', listOrders)
orderRouter.post('/status', updateStatus)

export default orderRouter
