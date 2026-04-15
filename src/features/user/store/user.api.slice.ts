import { fetchAPI } from "@/store/base.store";
import { deactivateAccountCredentials, deleteAccountCredentials, editProfileCredientials, UserResponse } from "@/types/api.types";






export const userApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        updateProfile: build.mutation<UserResponse,editProfileCredientials>({
            query:({endpoint,profile})=>({
                url: `/profile/${endpoint}/edit-profile`,
                method:"PATCH",
                body:{profile}
            })
        }),

        deactivateAccount: build.mutation<UserResponse, deactivateAccountCredentials>({
            query: ({ endpoint }) => ({
                url: `/profile/${endpoint}/deactivate`,
                method: "PATCH",
            })
        }),


        deleteAccount: build.mutation<UserResponse, deleteAccountCredentials>({
            query: ({ endpoint }) => ({
                url: `/profile/${endpoint}/delete`,
                method: "DELETE",
            })
        }),
    })
})


export const { useUpdateProfileMutation,useDeactivateAccountMutation,useDeleteAccountMutation,} = userApiSlice