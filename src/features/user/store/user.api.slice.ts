import { fetchAPI } from "@/store/base.store";
import { signupFormSchema } from "../schema/signup.schema";
import { UserDbModel } from "../types/user.types";


export const userApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        createUser: build.mutation({
            query: (userInfo)=>({
                url:"/users/create_user",
                method:"POST",
                body:userInfo
            })
        }),
        // this need to be refactor to be mutation with body
        verifyEmail:build.query({
            query:(verifyEmailToken)=>({
                url: `/authentication/verify_email/${verifyEmailToken}`,
                // body: verifyEmailToken
            })
        })
    })
})

export const {useCreateUserMutation,useVerifyEmailQuery}=userApiSlice