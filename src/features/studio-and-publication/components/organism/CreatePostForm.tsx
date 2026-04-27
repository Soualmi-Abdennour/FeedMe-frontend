"use client"
import { cn } from '@/utils/shadcn.utils'
import { ICreatePostFormProps, IEditPostFormProps } from '../../types/props.types'
import PostForm from './PostFrom'
import { useCreatePostMutation } from '../../store/studio.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { PostResponse } from '@/types/api.types'
import { toast } from 'sonner'


function CreatePostForm({ className, onClose }: ICreatePostFormProps) {
    const [createPost]=useCreatePostMutation()
    const  onSubmit=async (postData:FormData)=>{
        const fetchResponse = await createPost(postData)
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: PostResponse = fetchResponse.data as PostResponse

        if (error) {
            const errorResponse = error.data as PostResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.message)
            }
        }
        else {
            const successResponseData = successResponse.data
            toast.success(successResponse.message)
            onClose()
        }         
    }
    return (
        <div className={cn('relative max-w-[600px] w-full flex flex-col items-center rounded-lg bg-white p-10 gap-3', className)}>
            {/* Close button */}
            
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-neutral-500 hover:text-neutral-900text-xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>
            
            <PostForm onSubmit={onSubmit}></PostForm>
        </div>
    )
}

export default CreatePostForm
