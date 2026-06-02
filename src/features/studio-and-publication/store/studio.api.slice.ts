import { fetchAPI } from "@/store/base.store";
import { editPostCredientials, PostsResponse, SinglePostResponse, UploadVideoPayload } from "@/types/api.types";

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
        getMyPosts: build.query<PostsResponse, void >({
            query: () => ({
                url: `/posts/my-posts`,
            }),
            providesTags: ["Post"] // ✅
        }),
        uploadVideo: build.mutation<{secure_url:string}, UploadVideoPayload>({
            query: ({cloudName,formData})=>({
                url: `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
                method: "POST", body: formData 
            })
        })
            // async (file) => {
            //     try {
            //         const url = await uploadVideo(file);
            //         return { data: url };
            //     } catch (error) {
            //         return { error: { status: "CUSTOM_ERROR", error: String(error) } };
            //     }}})
        // useUploadPostVideo:build.mutation<string,FormData>({
        //     query: (formData)=>({
        //         url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        //         method: "POST",
        //         body: formData
        //     })
        // })
    })
})

export const {
    useUploadVideoMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useEditPostMutation,
    useGetPostQuery,
    useGetMyPostsQuery,
} = studioApiSlice