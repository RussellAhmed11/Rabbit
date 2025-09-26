import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./Slices/AuthSlices"
import productReducer from "./Slices/ProductSlices"
import cartReducer from "./Slices/CartSlices"
import checkoutReducer from "./Slices/checkoutSlices"
import orderReducer from "./Slices/OrderSlices"
import adminReducer from "./Slices/adminSlices"
const store=configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        orders:orderReducer,
        admin:adminReducer,
    }
})

export default store;