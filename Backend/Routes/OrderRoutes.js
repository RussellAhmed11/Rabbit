const express=require("express");
const Order =require("../Models/Order");
const {protect}=require("../middleware/AuthMiddleware");

const router=express.Router();

// get api/order/my-orders
// logged in user,access prive

router.get("/my-orders",protect,async(req,res)=>{
 try{
  const orders=await Order.find({user:req.user._id}).sort({
    createdAt:-1,
  }) //sort by most recent orders
  res.json(orders)
 }catch(error){
    console.log(error)
    res.status(500).json({message:"Server Error"})
 }
})

// get api/orders/:id
// get order details by ID,access prive

router.get("/:id",protect,async(req,res)=>{
    try{
     const order=await Order.findById(req.params.id).populate(
        "user",
        "name email"
     )
     if(!order){
        return res.status(404).json({message:"Order not found"})
     }
     res.json(order)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})
module.exports=router;