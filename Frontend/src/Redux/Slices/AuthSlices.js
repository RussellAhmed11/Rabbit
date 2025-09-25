import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
// Retrieve user info token from localstorage if available
const userFromStorage=localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo")):null;

// Check for an existing guest Id in the localstorage or generate a new one
const initialGuestId=localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId",initialGuestId);

// Initial state
const initialState={
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null
}
// async thunk for User login
export const loginUser=createAsyncThunk("auth/loginUser",async(userData,{rejectWithValue})=>{
    try{
      const respone=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData)
      localStorage.setItem("userInfo",JSON.stringify(respone.data.user));
      localStorage.setItem("userToken",respone.data.token)
      return respone.data.user //return user object from the response
    }catch(error){
        console.log(error)
    }
})
// async thunk for User registation
export const registerUser=createAsyncThunk("auth/registerUser",async(userData,{rejectWithValue})=>{
    try{
     const respone=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData)
      localStorage.setItem("userInfo",JSON.stringify(respone.data.user));
      localStorage.setItem("userToken",respone.data.token)
      return respone.data.user //return user object from the response
    }catch(error){
        console.log(error)
      return rejectWithValue(error.respone.data)
    }
})

// Slice
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
     logout:(state)=>{
        state.user=null;
        state.guestId=`guest_${new Date().getTime()}`;
        localStorage.removeItem("userToken");
        localStorage.removeItem("userInfo");
        localStorage.setItem("guestId",state.guestId)
     },
     generateNewGuestId:(state)=>{
     state.guestId=`guest_${new Date().getTime()}`
     localStorage.setItem("guestId",state.guestId)
     }
    },
    extraReducers:(builder)=>{
     builder
     .addCase(loginUser.pending,(state)=>{
        state.loading=true;
        state.error=null
     })
     builder
     .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=action.payload
     })
     builder
     .addCase(loginUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload.message
     })
     .addCase(registerUser.pending,(state)=>{
        state.loading=true;
        state.error=null
     })
     builder
     .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=action.payload
     })
     builder
     .addCase(registerUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload.message
     })
    }
})

export const {logout,generateNewGuestId}=authSlice.actions;
export default authSlice.reducer;