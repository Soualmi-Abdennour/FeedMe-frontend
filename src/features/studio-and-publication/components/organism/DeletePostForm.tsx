"use client"
import React from 'react'
import { IDeletePostFormProps } from '../../types/props.types'
import { cn } from '@/utils/shadcn.utils'
import SubmitButton from '@/components/atoms/SubmitButton'
import { Button } from '@/components/ui/button'
import { useDeletePostMutation } from '../../store/studio.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SinglePostResponse } from '@/types/api.types'
import { toast } from 'sonner'


function DeletePostForm({ className, postId, onClose,setIsProcess }: IDeletePostFormProps) {
    const [deletePost,{isLoading}] = useDeletePostMutation()
    const handleClick = async () => {
        setIsProcess(true)
        const fetchResponse = await deletePost(postId)
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
        setIsProcess(false)

    }
     if (isLoading) {
            return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4   bg-white rounded-2xl py-6 px-32">
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
        <div className={cn(className = "relative ", className)}>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>
            )}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
                <h2 className="text-neutral-800 text-base font-bold  text-center">
                    Delete post?
                </h2>                
                <p className="text-sm text-neutral-500 text-center">
                    Are you sure you want to delete this post?
                </p>
                <div className="flex gap-3 mt-1">
                    <Button
                        onClick={onClose}
                        variant={"ghost"}
                        className="flex-1 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"fail"}
                        className="flex-1 py-2 rounded-full bg-fail-500 text-white text-sm font-semibold hover:bg-fail-600 transition disabled:opacity-60"
                        onClick={handleClick}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostForm
