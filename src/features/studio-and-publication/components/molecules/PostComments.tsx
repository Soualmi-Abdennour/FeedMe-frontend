import { cn } from '@/utils/shadcn.utils'
import React from 'react'
import PostComment from '../atoms/PostComment'

const COMMENTS=[
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    },
    {
        userName:"yoo_fj",
        profileImageUrl:"/",
        comment:"this is a good dish"
    }
]

function PostComments({className}:{className?:string}) {
    return (
        <div className={cn('flex flex-col max-h-[346px] w-[390px] bg-[#F8F8F8] rounded-md p-5 border border-black',className )}>
            <h1 className='text-center pb-5'>Post Comments</h1>
            <div className='space-y-3 overflow-y-scroll'>
                {COMMENTS.map((comment,index)=>(
                    <PostComment key={index} {...comment}></PostComment>
                ))}
            </div>
        </div>
    )
}

export default PostComments
