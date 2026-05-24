import { fetchAPI } from "@/store/base.store";
import { createCommnetCredentials, getPostCommnetsCredentials, getPostsCredentials, LikeResponse, PostCommentsResponse, PostsResponse, SingleCommentResponse, toggleLikeCredentials } from "@/types/api.types";

export const publicationSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({   
        getPublicationPosts:build.query<PostsResponse,getPostsCredentials>({
            query: ({ cursor, limit = 10 }) => ({
                url: `/posts`,
                params: {
                    ...(cursor && { cursor }),
                    limit,
                },
            }),
        }),
        toggleLike:build.mutation<LikeResponse,toggleLikeCredentials>({
            query:({postId})=>({
                url: `/posts/${postId}/toggle-like`,
                method:"POST"
            })
        }),
        createComment: build.mutation<SingleCommentResponse,createCommnetCredentials>({
            query: ({ postId, text}) => ({
                url: `/posts/${postId}/comments`,
                method: "POST",
                body:{text}
            }),     
            invalidatesTags:["Comments"]   
        }),
        getPostComments:build.query<PostCommentsResponse,getPostCommnetsCredentials>({
            query:({postId})=>({
                url: `/posts/${postId}/comments`,
            }),
            providesTags:["Comments"]
        })
    })
})

export const {
    useToggleLikeMutation,
    useGetPublicationPostsQuery,
    useCreateCommentMutation,
    useGetPostCommentsQuery
} = publicationSlice