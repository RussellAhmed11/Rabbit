import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./Slices/AuthSlices"
import productReducer from "./Slices/ProductSlices"
const store=configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
    }
})

export default store;