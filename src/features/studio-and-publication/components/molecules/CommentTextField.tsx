"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NormalUserProfileAppModel, RestaurantUserProfileAppModel, UserAppModel } from '@/features/user/types/user.types'
import { useAppSelector } from '@/store/base.store'
import Image from 'next/image'
import React, { useState } from 'react'
import { useCreateCommentMutation } from '../../store/publication.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SingleCommentResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { ICommnetTextField } from '../../types/props.types'

function CommentTextField({ postId ,setCommentsCount}: ICommnetTextField) {
    const user=useAppSelector(state=>state.user.user) as UserAppModel
    const [createComment]=useCreateCommentMutation()
    const [text,setText]=useState<string>("")
    var profileImageUrl:string=""
    if(user.role==="USER"){
        const profile =user.profile! as NormalUserProfileAppModel
        profileImageUrl=profile.userBasicInformation.profileImageUrl?? ""
    }else {
        const profile = user.profile! as RestaurantUserProfileAppModel
        profileImageUrl = profile.restaurantBasicInformation.restaurantLogoUrl ?? ""  
    }
    const onSubmit=async()=>{        
        const fetchResponse = await createComment({
            postId,
            text
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: SingleCommentResponse = fetchResponse.data as SingleCommentResponse
        if (error) {
            const errorResponse = error.data as SingleCommentResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.message)
            }
        }
        else {
            toast.success(successResponse.message)
            setCommentsCount(prev=>prev+1)
            setText("")
        }
    }
    return (
    <div className='flex gap-3 border border-neutral-300 p-1 pr-3 bg-neutral-50 rounded-3xl items-center'>
        <div className='rounded-full size-8 bg-gray-800 shrink-0'>
            {/* <Image src={profileImageUrl} alt='/'></Image> */}
        </div>
      <Input 
        value={text}
        placeholder='Add a comment...'
                className='text-wrap h-fit w-full font-medium text-xs placeholder:text-[#404040] text-black/90 border-none outline-none'
        onChange={(e)=>setText(e.target.value)}
        ></Input>
        <Button
            variant={"ghost"}
            disabled={text.trim().length===0}
            onClick={onSubmit}
            className='text-primary-500 rounded-full p-0 shrink-0 font-medium text-xs '
        >Post</Button>
    </div>
  )
}

export default CommentTextField
