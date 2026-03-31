import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { authStateModel } from "../types/auth.types";


export interface IAuthState {
    authentication:authStateModel|null
}


const initialState: IAuthState = {
    authentication: null
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthState: (state: IAuthState, action: PayloadAction<authStateModel>)=>{
            state.authentication=action.payload
        },
        clearAuthState: (state: IAuthState)=>{
            state.authentication=null
        }
    }
})

export const {clearAuthState,setAuthState}=authSlice.actions
export default authSlice.reducer