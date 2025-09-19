const mongoose=require("mongoose")
const dotenv=require("dotenv")
const Product=require("./Models/Product")
 const User=require("./Models/User")
 const products=require("./data/products")


 dotenv.config()
//  connect to mongodb
mongoose.connect(process.env.MONGO_URI)

// function to send data
const seedData=async()=>{
    try{
        await Product.deleteMany()
        await User.deleteMany()
        // Create admin user
        const createUser=await User.create({
           name:"Admin User",
           email:"admin@example.com",
           role:"admin"
        })
        // Assign the default user Id to each product
        const userId=createUser._id
        const sampleProducts=products.map((product)=>{
            return {...product,user:userId}
        })
        // insert the products into database
        await Product.insertMany(sampleProducts)
        console.log("product data seeded successfuly")
        process.exit()
    }catch(error){
        console.log("Error seeding the data",error)
    }
}
seedData()