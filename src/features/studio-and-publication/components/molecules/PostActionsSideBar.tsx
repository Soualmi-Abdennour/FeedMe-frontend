"use client"
import { Button } from '@/components/ui/button'
import { Bookmark, Heart, MessageCircleMore, ReceiptText } from 'lucide-react'
import React, { useState } from 'react'
import { IPostActionsSideBar } from '../../types/props.types'


function PostActionsSideBar({
    handleLike,
    handleSave,
    toggleComments,
    toggleDetails,
    likesNumber,
    commentsNumber
}:IPostActionsSideBar) {
    // const [isSaved,setIsSaved]=useState<boolean>(false)
    // const [isLiked,setIsLiked]=useState<boolean>(false)
    return (
        <div className='flex flex-col items-center gap-5'>
            <button 
                onClick={handleLike}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <Heart className="size-5 text-black" />
                </div>
                <span className="text-xs font-medium text-black/80">{likesNumber}</span>
            </button>
            <button 
                onClick={toggleComments}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <MessageCircleMore className="size-5 text-black" />
                </div>
                <span className="text-xs font-medium text-black/80">{commentsNumber}</span>
            </button>
            <button 
                onClick={handleSave}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition group-hover:bg-black/20">
                    <Bookmark className="size-5 text-black" />
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
