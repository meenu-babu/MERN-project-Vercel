import mongoose from "mongoose"

const connectionString=process.env.MONGO_URL

const connectDB=async()=>{
    try {
        await mongoose.connect(connectionString)
        console.log(" Database connected successfully!!!!! ")
    } catch (error) {
        console.log("Database connection failed :",error.message)
    }

}

export default connectDB