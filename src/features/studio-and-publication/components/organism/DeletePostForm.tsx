"use client"
import React from 'react'
import { IDeletePostFormProps } from '../../types/props.types'
import { cn } from '@/utils/shadcn.utils'
import SubmitButton from '@/components/atoms/SubmitButton'
import { Button } from '@/components/ui/button'
import { useDeletePostMutation } from '../../store/studio.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { PostResponse } from '@/types/api.types'
import { toast } from 'sonner'


function DeletePostForm({className,postId,onClose}:IDeletePostFormProps) {
    const [deletePost]=useDeletePostMutation()
    const handleClick=async ()=>{
        const fetchResponse = await deletePost(postId)
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
        <div className={cn('relative max-w-[600px] w-full flex flex-col items-center border-2 border-black bg-white p-10 gap-3', className)}>
            {/* Close button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>
            )}
            <div className='flex flex-col items-center '>
                <h1 className='text-fail-500 font-bold'>Delete Post?</h1>
                <p>Are you sure you want to delete this post?</p>
                <div className='grid grid-cols-2 justify-between gap-10 mt-5'>
                    <SubmitButton 
                    className='text-white font-bold bg-fail-500 hover:bg-fail-600'
                        onClick={handleClick}
                    >
                        Delete
                    </SubmitButton>
                    <Button onClick={onClose} variant='secondary'>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostForm
