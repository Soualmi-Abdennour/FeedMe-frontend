import { fetchAPI } from "@/store/base.store";
import { PostDbModel } from "../types/studio.types";
import { editPostCredientials, PostResponse } from "@/types/api.types";






export const studioApiSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({
        createPost: build.mutation<PostResponse, FormData>({
            query: (postData) => ({
                url: `/posts`,
                method: "POST",
                body: postData
            })
        }),
        editPost: build.mutation<PostResponse, editPostCredientials>({
            query: ({ postData, id }) => ({
                url: `/posts/${id}`,
                method: "PATCH",
                body: postData
            })
        }),
        deletePost: build.mutation<PostResponse, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            })
        }),
        getPost: build.query<PostResponse, string>({
            query: (id) => ({
                url: `/posts/${id}`,
            })
        })
    })
})

export const { useCreatePostMutation,useDeletePostMutation,useEditPostMutation,useGetPostQuery } = studioApiSlice