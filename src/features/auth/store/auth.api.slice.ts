import { fetchAPI } from "@/store/base.store";






export const authApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        singup:build.mutation({
            query:(userCredientials)=>({
                url:"/api/authentication/sign-up",
                method:"POST",
                body: userCredientials
            })
        }),
    })
})

export const {useSingupMutation} =authApiSlice