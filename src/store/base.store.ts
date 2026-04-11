import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import userReducer from "@/features/user/store/user.slice"
import authReducer from "@/features/auth/store/auth.slice"
import onboardingReducer from "@/features/onboarding/store/onboarding.slice"
import { useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// RTK QUERY SETUP 
export const fetchAPI=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.authentication.authentication?.jwtToken          
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({})
})
const persistConfig = {
    key: 'root',
    storage,
    whiteList:["user","authentication"]
}
const rootReducer=combineReducers({
    [fetchAPI.reducerPath]:fetchAPI.reducer,
    user:userReducer,
    authentication:authReducer,
    onboarding: onboardingReducer,

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store=configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
        fetchAPI.middleware
    )
})
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();