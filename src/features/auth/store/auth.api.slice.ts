import { fetchAPI } from "@/store/base.store";
import { ApiResponse, resetPasswordCredentials, SendVerificationResponse, sendVerificationTokenCredientials, UserResponse, VerificationResponse, verifyTokenCredientials } from "@/types/api.types";
import { IForgetPasswordForm } from "../schema/forgetPassword.schema";
import { UserAppModel } from "@/features/user/types/user.types";
import { ISignupForm } from "../schema/signup.schema";
import { ISigninForm } from "../schema/signin.schema";
import { IResetPasswordForm } from "../schema/resetPassword.schema";






export const authApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        singup:build.mutation<UserResponse,ISignupForm>({
            query:(signupCredientials)=>({
                url:"authentication/sign-up",
                method:"POST",
                body: signupCredientials
            })
        }),
        signin:build.mutation<UserResponse,ISigninForm>({
            query:(signinCredientials)=>({
                url:"authentication/sign-in",
                method:"POST",
                body:signinCredientials
            })
        }),
        verifyToken:build.query<VerificationResponse,verifyTokenCredientials>({
            query:({token,endpoint})=>({
                url: `authentication/${endpoint}/${token}`
            })
        }),
        sendVerificationEmail: build.mutation<SendVerificationResponse, sendVerificationTokenCredientials>({
            query: ({ identifier,endpoint})=>({
                url: `authentication/${endpoint}`,
                method:"POST",
                body:{
                    identifier
                }
            })
        }),
        resetPassword:build.mutation<UserResponse,resetPasswordCredentials>({
            query:(resetPasswordCredentials)=>({
                url:"authentication/reset-password",
                method:"POST",
                body: resetPasswordCredentials
            })
        })
    })
})

export const {useSingupMutation,useSigninMutation,useVerifyTokenQuery,useSendVerificationEmailMutation,useResetPasswordMutation} =authApiSlice