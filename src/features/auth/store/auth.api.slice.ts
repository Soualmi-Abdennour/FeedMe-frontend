import { fetchAPI } from "@/store/base.store";






export const authApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        login:build.mutation({
            query:(userCredientials)=>({
                url:"/api/v1/auth/login",
                body: userCredientials
            })
        }),
        // logout endpoint   
    })
})

export const {useLoginMutation} =authApiSlice