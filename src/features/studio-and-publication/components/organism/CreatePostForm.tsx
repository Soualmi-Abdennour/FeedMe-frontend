"use client"
import { cn } from '@/utils/shadcn.utils'
import { ICreatePostFormProps, IEditPostFormProps } from '../../types/props.types'
import PostForm from './PostFrom'
import { useCreatePostMutation } from '../../store/studio.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SinglePostResponse } from '@/types/api.types'
import { toast } from 'sonner'


function CreatePostForm({ className, onClose }: ICreatePostFormProps) {
    const [createPost,{isLoading}]=useCreatePostMutation()
    const  onSubmit=async (postData:FormData)=>{
        const fetchResponse = await createPost(postData)
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
                }
        else {
            toast.success(successResponse.message)
            onClose()
        }         
    }
     if (isLoading) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
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
        <div className={cn('relative  w-full flex flex-col items-start gap-4 justify-center rounded-lg bg-white ', className)}>
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-neutral-500 hover:text-neutral-900 text-xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>
            <h2 className="text-base font-bold text-neutral-800">
                Create Post :
            </h2>
            <PostForm onSubmit={onSubmit} onClose={onClose}></PostForm>
        </div>
    )
}

export default CreatePostForm
