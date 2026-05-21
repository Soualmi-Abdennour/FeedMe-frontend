import { fetchAPI } from "@/store/base.store";
import { editProfileCredientials, UserResponse } from "@/types/api.types";






export const userApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        updateProfile: build.mutation<UserResponse,editProfileCredientials>({
            query:({endpoint,profile})=>({
                url: `/profile/${endpoint}/edit-profile`,
                method:"PATCH",
                body:{profile}
            })
        }),
        updateAccount: build.mutation<UserResponse,any>({
            query:(profile)=>({
                url: `/profile/edit-account`,
                method:"PATCH",
                body:profile
            })
        }),

        // deactivateAccount: build.mutation<UserResponse, deactivateAccountCredentials>({
        //     query: ({ endpoint }) => ({
        //         url: `/profile/${endpoint}/deactivate`,
        //         method: "PATCH",
        //     })
        // }),


        deleteAccount: build.mutation<UserResponse, null>({
            query: () => ({
                url: `/profile/delete-account`,
                method: "DELETE",
            })
        }),
    })
})


export const {useUpdateAccountMutation, useUpdateProfileMutation,useDeleteAccountMutation,} = userApiSlice