import { fetchAPI } from "@/store/base.store";






export const authApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        singup:build.mutation({
            query:(userCredientials)=>({
                url:"/authentication/sign-up",
                method:"POST",
                body: userCredientials
            })
        }),
        signin:build.mutation({
            query:(userCredientials)=>({
                url:"authentication/sign-in",
                method:"POST",
                body:userCredientials
            })
        }),
    })
})

export const {useSingupMutation,useSigninMutation} =authApiSlice