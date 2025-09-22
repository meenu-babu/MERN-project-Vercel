import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Razorpay from "razorpay";
import crypto from 'crypto';


// global variables
const currency = 'INR'
const deliveryCharges = 10

// razorpay  gateway initialize

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // from test keys
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// place order using cash on delivery
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
// place order usingStripe payment method
const placeOrderRazorPay = async (req, res) => {
    try {
    const { userId, items, amount, address } = req.body;

    // ✅ Create Razorpay order
    const options = {
      amount: amount * 100, // amount in paise (smallest currency unit)
      currency: currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // ✅ Save a pending order in DB
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      razorpayOrderId: razorpayOrder.id, // store this to verify later
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    res.json({
      success: true,
      order: razorpayOrder, // send order details to frontend
      key_id: process.env.RAZORPAY_KEY_ID, // frontend needs this to open checkout
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// verify RazorPay method
const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Update order as paid
      await orderModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { payment: true }
      );

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



//All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}


//All orders data forfrontend
const userOrders = async (req, res) => {
    try {
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
console.log(error)
res.json({success:false,message:error.message})
    }
}

//updating order status for admin panel
const updateStatus = async (req, res) => {
    try {
const {orderId,status}=req.body
await orderModel.findByIdAndUpdate(orderId,{status})
res.json({success:true,message:'Status Updated'})
    } catch (error) {
console.log(error)
res.json({success:false,message:error.message})
    }
}

export { placeOrder, placeOrderRazorPay, allOrders, userOrders, verifyRazorPay, updateStatus }
