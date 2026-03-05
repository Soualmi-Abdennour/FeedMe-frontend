import { createSlice } from "@reduxjs/toolkit/react";
import { authStateModel } from "../types/auth.types";


export interface authStateI {
    authentication:authStateModel|null
}


const initialState: authStateI = {
    authentication: null
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthState:(state:authStateI,action)=>{
            state.authentication=action.payload
        },
        clearAuthState:(state:authStateI)=>{
            state.authentication=null
        }
    }
})

export const {clearAuthState,setAuthState}=authSlice.actions
export default authSlice.reducer