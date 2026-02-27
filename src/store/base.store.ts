import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import userReducer from "@/features/user/store/user.slice"
import authReducer from "@/features/auth/store/auth.slice"


// RTK QUERY SETUP 
export const fetchAPI=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
    }),
    endpoints:(builder)=>({})
})

const rootReducer=combineReducers({
    [fetchAPI.reducerPath]:fetchAPI.reducer,
    user:userReducer,
    authentication:authReducer,
})

export const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(
        fetchAPI.middleware
    )
})

