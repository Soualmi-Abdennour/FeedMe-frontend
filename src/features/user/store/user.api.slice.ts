import { fetchAPI } from "@/store/base.store";
import { editProfileCredientials, getOtherUserPostsCredentials, getUserProfileCredentials, PostsResponse, UserResponse } from "@/types/api.types";






export const userApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        updateProfile: build.mutation<UserResponse,editProfileCredientials>({
            query:({endpoint,data})=>({
                url: `/profile/${endpoint}/edit-profile`,
                method:"PATCH",
                body:data
            })
        }),
        updateAccount: build.mutation<UserResponse,any>({
            query:(profile)=>({
                url: `/profile/edit-account`,
                method:"PATCH",
                body:profile
            })
        }),



        deleteAccount: build.mutation<UserResponse, void>({
            query: () => ({
                url: `/profile/delete-account`,
                method: "DELETE",
            })
        }),

        getUserProfile:build.query<UserResponse,getUserProfileCredentials>({
            query:({userName})=>({
                url: `/profile?userName=${userName}`,
            })
        }),
        getOtherUserPosts:build.query<PostsResponse,getOtherUserPostsCredentials>({
            query:({userId})=>({
                url: `/posts/other-posts/${userId}`
            }),
        }),
        getUserSavedPosts:build.query<PostsResponse,void>({
            query:()=>({
                url:"/posts/saved"
            })
        }),
        getUserLikedPosts:build.query<PostsResponse,void>({
            query:()=>({
                url:"/posts/liked"
            })
        }),
    })
})


export const {useGetOtherUserPostsQuery,useUpdateAccountMutation, useUpdateProfileMutation,useDeleteAccountMutation,useGetUserLikedPostsQuery,useGetUserProfileQuery,useGetUserSavedPostsQuery} = userApiSlice