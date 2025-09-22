import express from "express"
import adminAuth from "../middleware/adminAuth.js"
import { allOrders, placeOrder, placeOrderRazorPay, updateStatus, userOrders, verifyRazorPay } from "../controllers/orderController.js"
import authUser from "../middleware/auth.js"

const orderRouter=express.Router()

// For admin
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// for payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

// verify payment
orderRouter.post('/verifyrazorpay',authUser,verifyRazorPay)

// for user
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter