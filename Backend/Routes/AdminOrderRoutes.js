const express=require("express");
const Order=require("../Models/Order");
const {protect,admin}=require("../middleware/AuthMiddleware");

const router=express.Router();

// get api/admin/router
// get all order (Admin only)
// access Private/Admin

router.get("/", protect,admin,async(req,res)=>{
 try{
const orders=await Order.find({}).populate("user","name email")
res.json(orders)
 }catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
 }
})
// Put /api/admin/orders
// update order status
// access private admin only
router.put("/:id",protect,admin,async(req,res)=>{
    try{
      const order=await Order.findById(req.params.id)
      if(order){
        order.status=req.body.status || order.status;
        order.isDelivered=req.body.status === "Delivered" ? true:order.isDelivered;
        order.deliveredAt=req.body.status =="Delivered" ? Date.now() :order.deliveredAt;
        const updateOrder=await order.save()
        res.json(updateOrder)
      }else{
        res.status(404).json({message:"Order is not found"})
      }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})
// delete api/admin/orders/:id
// dlete an ordr
// access private/admin
router.delete("/:id",protect,admin,async(req,res)=>{
    try{
       const order=await Order.findById(req.params.id)
       if(order){
        await order.deleteOne()
        res.json({message:"Order removed"})
       }else{
        res.status(404).json({message:"order not found)"})
       }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})
module.exports=router