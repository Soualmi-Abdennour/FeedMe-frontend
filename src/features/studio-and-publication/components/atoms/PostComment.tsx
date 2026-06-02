"use client"
import { useAppSelector } from '@/store/base.store'
import { SingleCommentResponse } from '@/types/api.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Image from 'next/image'
import { toast } from 'sonner'
import { useDeletePostCommentMutation } from '../../store/publication.api.slice'
import { IPostComment } from '../../types/props.types'


function PostComment({ user: commentOwner, text, createdAt, commentId,post,setCommentsCount }: IPostComment) {
    
    const { user } = useAppSelector(state => state.user)
    const [deleteComment,{isLoading}] = useDeletePostCommentMutation()
    let profileImageUrl
    if (commentOwner.role === "USER") {
        profileImageUrl = commentOwner.profile?.userBasicInformation.profileImageUrl
    } else {
        profileImageUrl = commentOwner.profile?.restaurantBasicInformation.restaurantLogoUrl
    }
    const handleDelete = async () => {
        const fetchResponse = await deleteComment({ commentId })
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
            setCommentsCount(prev=>prev-1)
        }
    }
    return (
        <div className=' relative flex gap-2 items-start '>
            {isLoading && <div className='absolute inset-0 bg-white/25 z-10 '></div>}
            <div className='size-8  rounded-full shrink-0'>
                <Image src={profileImageUrl ?? "/default/default-profile-image.png"} alt='/' width={32} height={32} className='object-cover w-full h-full rounded-full'></Image>
            </div>
            <div className='flex flex-col items-start justify-between py-0.5 flex-1'>
                <h6 className='font-medium text-xs text-[#404040]'>
                    {commentOwner.userName}
                    <span>{"  " + new Date(createdAt).toLocaleDateString()}</span>
                </h6>
                <p className='font-normal text-sm text-[#181818]'>{text}</p>
            </div>
            {(commentOwner.id === user?.id || post.user.id === user?.id) &&  (
                <div>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className='text-red-500 text-xs p-1.5 rounded-md'
                    >
                        Delete
                    </button>
                </div>
            )
            }
        </div>
    )
}

export default PostComment
