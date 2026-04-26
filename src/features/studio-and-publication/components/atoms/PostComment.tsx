import Image from 'next/image'
import React from 'react'
import { IPostComment } from '../../types/props.types'


function PostComment({userName,comment,profileImageUrl}:IPostComment) {
    return (
        <div className='flex gap-3 border-2 border-black'>
            {/* <Image src={profileImageUrl} alt='/' width={100} height={100}></Image> */}
            <div className='size-16 bg-orange-500 rounded-full'></div>
            <div className='flex flex-col items-start justify-between py-1.5'>
                <h3>{userName}</h3>
                <p>{comment}</p>
            </div>
        </div>
    )
}

export default PostComment
