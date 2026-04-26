"use client"
import React, { useState } from 'react'
import PostItem from '../molecules/PostItem'
import PostActionsSideBar from '../molecules/PostActionsSideBar'
import PostDetails from '../atoms/PostDetails'
import PostComments from '../molecules/PostComments'
import { MOCK_POSTS } from '../../constants/mockData.contants'
import { convertMediaDbModelToMediaAppModel } from '../../utils/media.utils'
import { cn } from '@/utils/shadcn.utils'
import { PostDbModel } from '../../types/studio.types'


function PostWrapper({post}:{post:PostDbModel}) {
    const [itemToShow, setItemToShow] = useState<"COMMENTS"|"DETAILS"|null>(null)
    return (
        <div className={cn("relative flex items-end gap-4",itemToShow&& "-translate-x-28")}>
            <PostItem post={post}></PostItem>
            <PostActionsSideBar
                toggleComments={() => setItemToShow(state=>state?null:"COMMENTS")}
                toggleDetails={() => setItemToShow(state => state ? null : "DETAILS")}
                handleLike={() => console.log("like")}
                handleSave={() => console.log("save")}
                likesNumber={300}
                commentsNumber={369}
            ></PostActionsSideBar>
            <>
                {itemToShow==="DETAILS" &&(
                    <PostDetails
                        className='absolute left-[105%]  bottom-[15%]'
                        postTitle='Tacos Poly'
                        postDescription='This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit  This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit  This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit This is a post for Tacos Poly sans frit  This is a post for Tacos Poly sans frit'
                        contentType={"DISH"}
                    ></PostDetails>)}
                {itemToShow==="COMMENTS" && (
                    <PostComments
                        className='absolute left-[105%]  bottom-[15%]'
                    ></PostComments>
                )}
                
            </>
        </div>
    )
}

export default PostWrapper
