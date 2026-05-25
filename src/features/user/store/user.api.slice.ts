import { fetchAPI } from "@/store/base.store";
import { editProfileCredientials, getUserProfileCredentials, PostsResponse, UserResponse } from "@/types/api.types";






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


        deleteAccount: build.mutation<UserResponse, void>({
            query: () => ({
                url: `/profile/delete-account`,
                method: "DELETE",
            })
        }),

        getUserProfile:build.query<UserResponse,getUserProfileCredentials>({
            query:({userId})=>({
                url:""
            })
        }),
        getUserSavedPosts:build.query<PostsResponse,getUserProfileCredentials>({
            query:({userId})=>({
                url:""
            })
        }),
        getUserLikedPosts:build.query<PostsResponse,getUserProfileCredentials>({
            query:({userId})=>({
                url:""
            })
        }),
    })
})


export const {useUpdateAccountMutation, useUpdateProfileMutation,useDeleteAccountMutation,useGetUserLikedPostsQuery,useGetUserProfileQuery,useGetUserSavedPostsQuery} = userApiSlice