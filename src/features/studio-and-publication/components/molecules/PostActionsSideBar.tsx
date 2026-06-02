"use client"
import { LikeResponse } from '@/types/api.types'
import { cn } from '@/utils/shadcn.utils'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Bookmark, Heart, MessageCircleMore, ReceiptText } from 'lucide-react'
import { useState } from 'react'
import { useTogglePostLikeMutation, useTogglePostSaveMutation } from '../../store/publication.api.slice'
import { IPostActionsSideBar } from '../../types/props.types'


function PostActionsSideBar({
    toggleComments,
    toggleDetails,
    likesCount,
    commentsCount,
    postId,
    isLiked:isAlreadyLiked,
    isSaved:isAlreadySaved
 
}:IPostActionsSideBar) {
    const [isLiked, setIsLiked] = useState<boolean>(isAlreadyLiked)
    const [isSaved, setIsSaved] = useState<boolean>(isAlreadySaved)
    const [likeCount,setLikeCount]=useState<number>(likesCount)
    const [toggleLike] = useTogglePostLikeMutation()
    const [toggleSave]=useTogglePostSaveMutation()

    const handleLike = async () => {
        const previousIsLiked = isLiked;
        const previousLikeCount = likeCount;

        setIsLiked(!previousIsLiked);
        setLikeCount(prev => prev + (previousIsLiked ? -1 : 1));

        const fetchResponse = await toggleLike({ postId });
        const error = fetchResponse.error as FetchBaseQueryError;
        const successResponse = fetchResponse.data as LikeResponse;

        if (error) {
            setIsLiked(previousIsLiked);
            setLikeCount(previousLikeCount);
            return;
        }

        const serverIsLiked = successResponse?.data?.isLiked;
        if (serverIsLiked !== undefined && serverIsLiked !== !previousIsLiked) {
            setIsLiked(serverIsLiked);
            setLikeCount(prev => prev + (serverIsLiked ? 1 : -1));
        }
    };
    const handleSave = async () => {
        const previousIsSaved = isSaved;
        setIsSaved(!previousIsSaved);
        const fetchResponse = await toggleSave({ postId });
        const error = fetchResponse.error as FetchBaseQueryError;
        const successResponse = fetchResponse.data as LikeResponse;

        if (error) {
            setIsSaved(previousIsSaved);
            return;
        }

        const serverIsSaved = successResponse?.data?.isLiked;
        if (serverIsSaved !== undefined && serverIsSaved !== !previousIsSaved) {
            setIsSaved(serverIsSaved);
        }
    };
    return (
        <div className='flex flex-col items-center gap-5'>
            <button 
                onClick={handleLike}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <Heart fill={isLiked? "red":"none"} className={cn("size-6 text-black")} />
                </div>
                <span className="text-xs font-medium text-black/80">{likeCount}</span>
            </button>
            <button 
                onClick={toggleComments}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <MessageCircleMore className="size-5 text-black" />
                </div>
                <span className="text-xs font-medium text-black/80">{commentsCount}</span>
            </button>
            <button 
                onClick={handleSave}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <Bookmark fill={isSaved ? "orange" : "none"} className={cn("size-5 text-black")} />
                </div>
            </button>
            <button 
                onClick={toggleDetails}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <ReceiptText className="size-5 text-black" />
                </div>
            </button>
        </div>
    )
}

export default PostActionsSideBar
