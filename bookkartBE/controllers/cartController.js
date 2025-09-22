import userModel from "../models/userModel.js"

// controller function for adding a product to user's cart
const addToCart=async(req,res)=>{
    try {
        const {userId,itemId}=req.body

        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData

        if(cartData[itemId]){
            cartData[itemId]+=1
        }
        else{
            cartData[itemId]=1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log(error)
        res.jsonn({success:false,message:error.message})
    }
}

// controller function to update the user's cart
const updateCart=async(req,res)=>{
    try {
        const {userId,itemId,quantity}=req.body

        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData

        cartData[itemId]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Your cart updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// controller function for retrieving user's cart details
const getUserCart=async(req,res)=>{
    try {
        const {userId}=req.body
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}