"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/store/base.store'
import { SingleCommentResponse } from '@/types/api.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCreatePostCommentMutation } from '../../store/publication.api.slice'
import { ICommnetTextField } from '../../types/props.types'

function CommentTextField({ postId ,setCommentsCount}: ICommnetTextField) {
    const user=useAppSelector(state=>state.user.user!)
    const [createComment,{isLoading}]=useCreatePostCommentMutation()
    const [text,setText]=useState<string>("")
    
    const onSubmit=async()=>{        
        const fetchResponse = await createComment({
            postId,
            text
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: SingleCommentResponse = fetchResponse.data as SingleCommentResponse
        if (error) {                        
                    const errorResponse = error.data as SingleCommentResponse            
                    if (!errorResponse || errorResponse.status === "ERROR") {
                        toast.error("Something Went wrong.")
                    }
                    else {                
                        toast.error(errorResponse.errors?.at(0)?.message?? errorResponse.message)
                    }
                }
        else {
            toast.success(successResponse.message)
            setCommentsCount(prev=>prev+1)
            setText("")
        }
    }
    let profileImageUrl
    if (user.role === "USER") {
        profileImageUrl = user.profile?.userBasicInformation.profileImageUrl
    } else {
        profileImageUrl = user.profile?.restaurantBasicInformation.restaurantLogoUrl
    }
    return (
    <div className='flex gap-3 border border-neutral-300 p-1 pr-3 bg-neutral-50 rounded-3xl items-center'>
        <div className='rounded-full size-8  shrink-0 overflow-hidden'>
            <Image src={profileImageUrl?? "/default/default-profile-image.png"} alt='/' width={32} height={32} className=' w-full h-full object-cover'></Image>
        </div>
      <Input 
        value={text}
        placeholder='Add a comment...'
                className='text-wrap h-fit w-full font-medium text-xs placeholder:text-[#404040] text-black/90 border-none outline-none'
        onChange={(e)=>setText(e.target.value)}
        ></Input>
        <Button
            variant={"ghost"}
            disabled={text.trim().length===0 || isLoading}
            onClick={onSubmit}
            className='text-primary-500 rounded-full p-0 shrink-0 font-medium text-xs '
        >Post</Button>
    </div>
  )
}

export default CommentTextField
