const mongoose = require("mongoose")

const checkOutItemScema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    }, name: {
        type: String,
        require: true,
    }, image: {
        type: String,
        require: true
    }, price: {
        type: Number,
        require: true,
    }
}, { _id: false })

const checkOutSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    checkOutItems:[checkOutItemScema],
    shippingAddress:{
        address:{type:String,require:true},
        city:{type:String,require:true},
        postalCode:{type:String,require:true},
        country:{type:String,require:true},
    },
    paymentMethod:{
        type:String,
        require:true
    },
    totalPrice:{
        type:Number,
        require:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:{
        type:Date,  
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    paymentDetails:{
        type:mongoose.Schema.Types.Mixed
    },
    isFinalized:{
        type:Boolean,
        default:false
    },
    finalizedAt:{
      type:Date,  
    }
},{timestamps:true})
module.exports=mongoose.model("Checkout",checkOutSchema)