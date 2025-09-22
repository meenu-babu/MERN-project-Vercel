import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    date:{type:Number,required:true},
    popular:{type:Boolean}

})

const productModel=mongoose.models.products || mongoose.model('products',productSchema)

export default productModel

