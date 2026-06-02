"use client"
import { cn } from '@/utils/shadcn.utils'
import { ICreatePostFormProps, IEditPostFormProps } from '../../types/props.types'
import PostForm from './PostFrom'
import { useCreatePostMutation } from '../../store/studio.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SinglePostResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { useState } from 'react'


function CreatePostForm({ className, onClose, setIsProcess,isProcess }: ICreatePostFormProps) {
    const [createPost, { isLoading }] = useCreatePostMutation()
    const [isVideoUploading, setIsVideoUploading] = useState<boolean>(false)
    const onSubmit = async (postData: FormData) => {
        setIsProcess(true)
        const fetchResponse = await createPost(postData)
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: SinglePostResponse = fetchResponse.data as SinglePostResponse

        if (error) {
            const errorResponse = error.data as SinglePostResponse
            if (!errorResponse || errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
            }
        }
        else {
            toast.success(successResponse.message)
            onClose()
        }
        setIsProcess(false)
    }
    if (isLoading || isVideoUploading) {
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
        <div className={cn('relative w-full  max-h-[650px] flex flex-col items-start rounded-lg bg-white p-6 shadow-xl ', className)}>
            <button
                onClick={onClose}
                className="absolute top-2 right-5 text-neutral-500 hover:text-neutral-900 text-xl font-bold"
                aria-label="Close"
            >
                ✕
            </button>
            <h2 className="text-base font-bold text-neutral-800">
                Create Post :
            </h2>
            <div className="w-full flex-1 overflow-y-auto mt-2 pr-1 
                        [scrollbar-width:auto] 
                        [scrollbar-color:#fb923c_transparent]
                        [&::-webkit-scrollbar]:w-[3px]
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-primary-500
                        [&::-webkit-scrollbar-thumb]:rounded-full overflow-x-hidden">
                <PostForm onSubmit={onSubmit} onClose={onClose} isVideoUploading={isVideoUploading} setIsVideoUploading={setIsVideoUploading}></PostForm>
            </div>
        </div>
    )
}

export default CreatePostForm
