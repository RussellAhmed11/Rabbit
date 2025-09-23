const express = require("express");
const Product = require("../Models/Product");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router=express.Router();
// get api/admin/products
// get all products/Admin

router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

module.exports =router;