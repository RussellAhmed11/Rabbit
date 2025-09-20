const express = require("express")
const Product = require("../Models/Product")
const { protect, admin } = require("../middleware/AuthMiddleware")

const router = express.Router();

// post/api/product ,create a new product acess by private/admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            collors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensons,
            weight,
            sku
        } = req.body;
        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            collors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensons,
            weight,
            sku,
            user: req.user._id
        })
        const createdProduct = await product.save();
        res.status(201).json(createdProduct)
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
})

// api for product update route
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collection,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensons,
            weight,
            sku
        } = req.body;
        const product = await Product.findById(req.params.id)
        if (product) {
            // update product
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collection = collection || product.collection;
            product.material = material || product.name;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensons = dimensons || product.dimensons;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            // save the updated product
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: "product not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

// delete product from database
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            // remove from database
            await product.deleteOne()
            res.json({ message: "product remove success" })
        }
        else {
            res.status(404).json({ message: "product not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})
// route get api products and get all product with optional query filters
// public
router.get("/", async (req, res) => {
    try {
        const { collection,
            sizes,
            colors,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limt } = req.query;
        let query = {}
        // filter logic 
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collection = collection
        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") }
        }
        if (brand) {
            query.brand = { $in: brand.split(",") }
        }
        if (sizes) {
            query.sizes = { $in: sizes.split(",") }
        }
        if (colors) {
            query.colors = { $in: colors.split(",") }
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },

            ]
        }
        let sort={}
        // sort logic
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rSating: -1 };
                    break;
                default:
                    break;
            }
        }
        // Fetch products and apply sorting and limit
        let products=await Product.find(query).sort(sort).limit(Number((limt) || 0))
        res.json(products)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
})

// get/api/product/best-seller api
router.get("/best-seller",async(req,res)=>{
try{
    const bestSeller=await Product.findOne().sort({rating:-1})
    if(bestSeller){
        res.json(bestSeller)
    }else{
        res.status(404).json({message:"No best seller found"})
    }
}catch(error){
    console.log(error)
    res.status(500).send("server error")
}
})
// get/api/products/new-arrivals
router.get("/new-arraivals",async(req,res)=>{
    try{
      const newArrivals=await Product.find().sort({createAt:-1}).limit(8)
      res.json(newArrivals)
    }catch(error){
        console.log(error)
        res.status(500).send("server error")
    }
})
// api to get product details
router.get("/:id",async(req,res)=>{
try{
 const product=await Product.findById(req.params.id)
 if(product){
    res.json(product)
 }else{
    res.status(404).json({message:"product not found"})
 }
}catch(error){
    console.log(error)
    res.status(500).send("server error")
}
})
// get api for similar product details

router.get("/similar/:id",async(req,res)=>{
    const {id}=req.params
   try{
    const product=await Product.findById(id)
    if(!product){
        return res.status(404).json({message:"product not founf"})
    }
    const similarProduct=await Product.find({
        _id:{$ne:id}, // Exculde the current product id
        gender:product.gender,
        category:product.category,
    }).limit(4);
    res.json(similarProduct)
   }catch(err){
    console.log(err)
    res.status(500).send("Server Error")
   }
})


module.exports = router;