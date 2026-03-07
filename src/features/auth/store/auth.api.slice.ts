import { fetchAPI } from "@/store/base.store";
import { UserResponse } from "@/types/api.types";






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
        verifyToken:build.query<UserResponse,string|null>({
            query:(token)=>({
                url: `authentication/verify-email-token?token=${token}`
            })
        }),
        sendVerificationEmail:build.mutation({
            query:(user)=>({
                url:"/authentication/send-verification-email",
                method:"POST",
                body:user
            })
        })
    })
})

export const {useSingupMutation,useSigninMutation,useVerifyTokenQuery,useSendVerificationEmailMutation} =authApiSlice