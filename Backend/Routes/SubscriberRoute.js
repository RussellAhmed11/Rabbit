const express=require("express");
const Subscriber=require("../Models/Subscribe")
const router=express.Router()


// post api/subscribe
// handle news letter subscrption

router.post("/subscribe",async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"})
    }
    try{
     let subscriber=await Subscriber.findOne({email});
     if(subscriber){
        return res.status(400).json({message:"Email is already subscriber"})
     }
    //  create a new subscriber
    subscriber=new Subscriber({email})
    await subscriber.save()
    res.status(201).json({message:"Successfully subscribed to the news letter"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
})

module.exports=router;