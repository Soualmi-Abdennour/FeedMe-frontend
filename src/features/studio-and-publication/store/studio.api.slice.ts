import { fetchAPI } from "@/store/base.store";
import { editPostCredientials, getPostsCredentials, PostsResponse, SinglePostResponse } from "@/types/api.types";

export const studioApiSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({
        createPost: build.mutation<SinglePostResponse, FormData>({
            query: (postData) => ({
                url: `/posts`,
                method: "POST",
                body: postData
            }),
            invalidatesTags: ["Post"] // ✅
        }),
        editPost: build.mutation<SinglePostResponse, editPostCredientials>({
            query: ({ postData, id }) => ({
                url: `/posts/${id}`,
                method: "PATCH",
                body: postData
            }),
            invalidatesTags: ["Post"] // ✅
        }),
        deletePost: build.mutation<SinglePostResponse, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"] // ✅
        }),
        getPost: build.query<SinglePostResponse, string>({
            query: (id) => ({
                url: `/posts/${id}`,
            }),
            providesTags: ["Post"] // ✅
        }),
        getMyPosts: build.query<PostsResponse,getPostsCredentials >({
            query: ({ cursor, limit = 10 } = {}) => ({
                url: `/posts/my-posts`,
                params: {
                    ...(cursor && { cursor }),
                    limit,
                },
            }),
            providesTags: ["Post"] // ✅
        }),
    })
})

export const {
    useCreatePostMutation,
    useDeletePostMutation,
    useEditPostMutation,
    useGetPostQuery,
    useGetMyPostsQuery,
} = studioApiSlice