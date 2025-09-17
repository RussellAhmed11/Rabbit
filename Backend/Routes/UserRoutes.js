const express = require("express")
const User = require("../Models/User")
const {protect}=require("../middleware/AuthMiddleware")
const jwt = require("jsonwebtoken")

const router = express.Router();

//@ route Post /api/users/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "user already exist" })
        user = new User({ name, email, password })
        await user.save()
        // create jwt payload
        const payload={user:{id:user._id,role:user.role}}
        // sign and return the token along user data
        jwt.sign(payload,process.env.JWT_SECRT,{
            expiresIn:"40h"
        },(err,token)=>{
           if(err) throw err; 
        //    send the user and token in response
         res.status(201).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },token
         })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})
// Post/api/users/login
// authenticate user
// access public
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
      let user=await User.findOne({email});
      if(!user) return res.status(400).json({message:"Invalid Credentials"});
      const isMatch=await user.matchPassword(password)
      if(!isMatch) return res.status(400).json({message:"Invalid Credentials"})
        // create jwt payload
        const payload={user:{id:user._id,role:user.role}}
        // sign and return the token along user data
        jwt.sign(payload,process.env.JWT_SECRT,{
            expiresIn:"40h"
        },(err,token)=>{
           if(err) throw err; 
        //    send the user and token in response
         res.json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },token
         })
        })
    }catch(err) {
       console.log(err)
       res.status(500).send("Server Errors")
    }
})
// get api/users/profile
// get logged in user profile
router.get("/profile",protect, async(req,res)=>{
    res.json(req.user)
})

module.exports = router;