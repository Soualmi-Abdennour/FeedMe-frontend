import { fetchAPI } from "@/store/base.store";
import { createCommnetCredentials, deleteCommnetCredentials, getPostCommnetsCredentials, getPostsCredentials, LikeResponse, PostCommentsResponse, PostsResponse, SaveResponse, SingleCommentResponse, toggleLikeCredentials, togglesSaveCredentials } from "@/types/api.types";

export const publicationSlice = fetchAPI.injectEndpoints({
    endpoints: (build) => ({   
        getAllPosts:build.query<PostsResponse,getPostsCredentials>({
            query: ({ cursor, limit = 10 }) => ({
                url: `/posts`,
                params: {
                    ...(cursor && { cursor }),
                    limit,
                },
            }),
        }),
        togglePostLike:build.mutation<LikeResponse,toggleLikeCredentials>({
            query:({postId})=>({
                url: `/posts/${postId}/toggle-like`,
                method:"POST"
            })
        }),
        togglePostSave:build.mutation<SaveResponse,togglesSaveCredentials>({
            query:({postId})=>({
                url: `/posts/toggleSavePost/${postId}`,
                method:"POST"
            })
        }),
        createPostComment: build.mutation<SingleCommentResponse,createCommnetCredentials>({
            query: ({ postId, text}) => ({
                url: `/posts/${postId}/comments`,
                method: "POST",
                body:{text}
            }),     
            invalidatesTags:["Comments"]   
        }),
        deletePostComment:build.mutation<SingleCommentResponse,deleteCommnetCredentials>({
            query:({commentId})=>({
                url: `/posts/comments/${commentId}`,
                method:"DELETE"
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
    useCreatePostCommentMutation,
    useGetAllPostsQuery,
    useDeletePostCommentMutation,
    useGetPostCommentsQuery,
    useTogglePostLikeMutation,
    useTogglePostSaveMutation
} = publicationSlice