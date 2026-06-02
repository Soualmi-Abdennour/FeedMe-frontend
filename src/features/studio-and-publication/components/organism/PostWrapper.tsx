"use client"
import { cn } from '@/utils/shadcn.utils'
import { useState } from 'react'
import { PostAppModel } from '../../types/studio.types'
import PostDetails from '../atoms/PostDetails'
import PostActionsSideBar from '../molecules/PostActionsSideBar'
import PostComments from '../molecules/PostComments'
import PostItem from '../molecules/PostItem'


function PostWrapper({post}:{post:PostAppModel}) {
    const [itemToShow, setItemToShow] = useState<"COMMENTS"|"DETAILS"|null>(null)
    const [commentsCount,setCommentsCount]=useState<number>(post.commentCount)
    console.log(post.commentCount);
    console.log(commentsCount);

    return (
        <div className={cn("relative flex h-full items-end gap-4 w-fit",itemToShow && "-translate-x-28")}>
            <PostItem post={post}></PostItem>
            <PostActionsSideBar
                toggleComments={() => setItemToShow(state=>state?null:"COMMENTS")}
                toggleDetails={() => setItemToShow(state => state ? null : "DETAILS")}
                postId={post.id}
                commentsCount={commentsCount}
                likesCount={post.likeCount}
                isLiked={!!post.isLiked}
                isSaved={!!post.isSaved}
            ></PostActionsSideBar>
            <>
                {itemToShow==="DETAILS" &&(
                    <PostDetails
                        className='absolute left-[105%]  bottom-[15%]'
                        postTitle={post.title}
                        postDescription={post.description}
                        contentType={post.contentType}
                    ></PostDetails>)}
                {itemToShow==="COMMENTS" && (
                    <PostComments
                        post={post}
                        setCommentsCount={setCommentsCount}
                        className='absolute left-[105%]  bottom-[15%]'
                    ></PostComments>
                )}
                
            </>
        </div>
    )
}

export default PostWrapper
