import express from "express";
import cors from "cors"
import "dotenv/config"
import connectDB from "./DB/connection.js";
import connectCloudinary from "./DB/cloudinary.js";
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express()
const PORT = 5000

// middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

// API endpoints
app.use('/user', userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)

// API endpoints
app.get('/', (req, res) => {
    res.send("Bookkart server is running and waiting for request")
})

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT)
})