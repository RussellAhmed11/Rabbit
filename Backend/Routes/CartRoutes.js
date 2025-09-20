const express = require("express")
const Cart = require("../Models/Cart")
const Product = require("../Models/Product")
const { protect } = require("../middleware/AuthMiddleware")


const router = express.Router()
// helper funcion to get by user Id or guest Id
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId })
    } else if (guestId) {
        return await Cart.findOne({ guestId })
    }
    return null;
}
// router post/api/cart
router.post("/", async (req, res) => {

    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ message: "Product not found" })
        // determine if the user is logged in or guest
        let cart = await getCart(userId, guestId)
        // if the cart exist update
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId && p.size == size && p.color == color
            )
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart)
        }
        else {
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],
                totalPrice: product.price * quantity,
            })
            return res.status(201).json(newCart)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
})
// create PUT/api/cart 
// update product quantity in the cart for a guest or logged-in user
router.put("/", async (req, res) => {

    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) return res.status(404).json({ message: "Cart not found" })
        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size == size && p.color === color)
        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity
            } else {
                cart.products.splice(productIndex, 1)
            }
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price + item.quantity, 0)
            await cart.save();
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: "Product not found in cart" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" })
    }
})

module.exports = router;