const express=require("express");
const Checkout=require("../Models/CheckOut");
const Cart=require("../Models/Cart");
const Product=require("../Models/Product");
const Order=require("../Models/Order");
const {protect}=require("../middleware/AuthMiddleware")

const router=express.Router()
// post/api/checkout
// create new checkout session,private
router.post("/",protect,async(req,res)=>{
  const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body;
  if(!checkoutItems || checkoutItems.length ===0){
     return res.status(400).json({message:"No items in checkout"})
  }
  try{
   const newCheckout=await Checkout.create({
    user:req.user._id,
    checkoutItems:checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus:"Pending",
    isPaid:false
   })
   console.log(`Checkout created for user:${req.user._id}`)
   res.status(201).json(newCheckout)
  }catch(error){
    console.log("Error creating checkout session",error)
    res.status(500).json({message:"server error"})
  }
})

// put/api/checkout/:id/pay
// update checkout to mark as paid after successful payment
// access private
router.put("/:id/pay",protect,async(req,res)=>{
    const {paymentStatus,paymentDetails}=req.body;
    try{
      const checkout=await Checkout.findById(req.params.id) 
      if(!checkout){
        return res.status(404).json({message:"Checkout not found"})
      }
      if(paymentStatus ==="paid"){
        checkout.isPaid=true;
        checkout.paymentStatus=paymentStatus;
        checkout.paidAt=Date.now();
        await checkout.save();
        res.status(200).json(checkout)
      }
      else{
        res.status(400).json({message:"Invalid Payment status"})
      }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

// post /api/checkout/:id/finalize
// finalize checkout and convert to an order after payment confirmation
// access private

router.post("/:id/finalize",protect,async(req,res)=>{
   try{
     const checkout=await Checkout.findById(req.params.id)
     if(!checkout){
        return res.status(404).json({message:"Checkout not found"})
     }
     if(checkout.isPaid && !checkout.isFinalized){
    //  create final order based on the checkout details
    const finalOrder=await Order.create({
        user:checkout.user,
        orderItems:checkout.orderItems,
        shippingAddress:checkout.shippingAddress,
        paymentMethod:checkout.paymentMethod,
        totalPrice:checkout.totalPrice,
        isPaid:true,
        paidAt:checkout.paidAt,
        isDelivered: false,
        paymentStatus:"paid",
        paymentDetails:checkout.paymentDetails
    })
    // mark the checkout as finalized
    checkout.isFinalized=true;
    checkout.finalizedAt=Date.now();
    await checkout.save()
    // delete the cart assoicated with the user
    await Cart.findOneAndDelete({user:checkout.user})
    res.status(201).json(finalOrder)
     }else if(checkout.isFinalized){
        res.status(400).json({message:"Checkout already finalized"})
     }else{
        res.status(400).json({messagepaid:"Checkout is not "})
     }
   }catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
   } 
})

module.exports=router;