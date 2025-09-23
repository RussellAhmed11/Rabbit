const express=require("express");
const User=require("../Models/User")
const {protect,admin}=require("../middleware/AuthMiddleware")

const router=express.Router();

// route get /api/admin/users
// get all users(Admin only)
// access private/Admin

router.get("/",protect,admin,async(req,res)=>{
    try{
      const users=await User.find({})
      res.json(users)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})
// post api/admin/users
// add a new user (admin only)
// access private/admin
router.post("/",protect,admin,async(req,res)=>{
  const {name,email,password,role}=req.body;
  try{
   let user=await User.findOne({email})
   if(user){
    res.status(400).json({message:"User already exist"})
   }
   user=new User({
    name,email,password,role:role || "customer"
    
   })
   await user.save()
   res.status(201).json({message:"User created successfully",user})
  }catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
  }
})

// put api/admin/users/:id
// update user info(admin only)
// access private/admin
router.put("/:id",protect,admin,async(req,res)=>{
   try{
     const user=await User.findById(req.params.id);
     if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        user.role=req.body.role || user.role
     }
     const updatedUser=await user.save()
     res.json({message:"User updated successfully",user:updatedUser})
   }catch(error){
    console.log(error)
    res.status(500).json({message:"Server error"})
   } 
})
// delte api/admin/users
// private/admin
router.delete("/:id",protect,admin,async(req,res)=>{
   try{
       const user=await User.findById(req.params.id)
       if(user){
        await user.deleteOne();
        res.json({message:"User delete successfully"})
       }else{
        res.status(404).json({message:"User not found"})
       }
   }catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
   } 
})

module.exports=router