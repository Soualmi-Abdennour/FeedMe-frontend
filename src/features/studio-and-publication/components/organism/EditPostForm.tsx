"use client"
import { cn } from '@/utils/shadcn.utils'
import { IEditPostFormProps } from '../../types/props.types'
import PostForm from './PostFrom'
import { useEditPostMutation, useGetPostQuery } from '../../store/studio.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SinglePostResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { convertMediaDbModelToMediaAppModel } from '../../utils/media.utils'


function EditPostForm({ className, onClose, postId }: IEditPostFormProps) {
    const fetchResponse = useGetPostQuery(postId)
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: SinglePostResponse = fetchResponse.data as SinglePostResponse
    
    const [editPost,{isLoading}] = useEditPostMutation()
    const onSubmit = async (postData: FormData) => {
        const fetchResponse = await editPost({ postData, id: postId })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: SinglePostResponse = fetchResponse.data as SinglePostResponse

        if (error) {                        
                    const errorResponse = error.data as SinglePostResponse            
                    if (!errorResponse || errorResponse.status === "ERROR") {
                        toast.error("Something Went wrong.")
                    }
                    else {                
                        toast.error(errorResponse.errors?.at(0)?.message?? errorResponse.message)
                    }
                } else {
            toast.success(successResponse.message)
            onClose()
        }
    }
    if (isLoading || fetchResponse.isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4   bg-white rounded-2xl py-6 px-32">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent " />
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Processing request</h3>
                    <p className="text-sm text-muted-foreground">
                        Please wait a moment...
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className={cn('relative w-full flex flex-col items-center bg-white rounded-2xl p-6 gap-3', className)}>
            <button
                onClick={onClose}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
                aria-label="Close"
            >
                ✕
            </button>

            {fetchResponse.isLoading ? (
                <h3>Loading please wait...</h3>
            ) : fetchResponse.isError ? (
                <h3>Something went wrong</h3>
            ) : successResponse?.data?.post ? (
                <PostForm
                    defaultValues={{
                        title: successResponse.data.post.title,
                        description: successResponse.data.post.description,
                        contentType: successResponse.data.post.contentType,
                        mediaList: convertMediaDbModelToMediaAppModel(successResponse.data.post.media),
                    }}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            ) : (
                <h3>Something went wrong</h3>
            )}
        </div>
    )
}

export default EditPostForm