import { createSlice } from "@reduxjs/toolkit/react";
import { authStateModel } from "../types/auth.types";


export interface authStateI {
    authentication:authStateModel|null
}

const getInitialState = (): authStateI => {
    const storedState = null
    // localStorage.getItem("authentication");
    return {
        authentication: storedState ? JSON.parse(storedState) : null
    };
};




const authSlice=createSlice({
    name:"auth",
    initialState:getInitialState(),
    reducers:{
        setAuthState:(state,action)=>{
            state.authentication=action.payload
            // localStorage.setItem("authState",action.payload)
        },
        clearAuthState:(state)=>{
            state.authentication=null
            localStorage.clear()
        }
    }
})

export const {clearAuthState,setAuthState}=authSlice.actions
export default authSlice.reducer