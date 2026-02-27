import { createSlice } from "@reduxjs/toolkit/react";
import { UserAppModel } from "../types/user.types";


interface userStateI  {
    user:null| UserAppModel
}
const initialState:userStateI={
    user:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        clearUser:(state)=>{
            state.user=null
        }
    }
})

export const {clearUser,setUser} =userSlice.actions
export default userSlice.reducer