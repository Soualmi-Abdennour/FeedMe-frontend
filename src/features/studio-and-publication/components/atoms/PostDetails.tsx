import React from 'react'
import { IPostDetails } from '../../types/props.types'
import { cn } from '@/utils/shadcn.utils'


function PostDetails({postTitle,postDescription,contentType,className}:IPostDetails) {
    return (
        <div className={cn('flex flex-col max-h-[346px] w-[390px] bg-[#F8F8F8] rounded-md p-5 border border-black',className )}>
            <h1 className='text-center pb-5'>Post Details</h1>
            <div className='flex-1 overflow-y-scroll space-y-5 '>
                <div>
                    <h3 className='mb-1 font-bold'>Title:</h3>
                    <p>{postTitle}</p>
                </div>
                <div>
                    <h3 className='mb-1 font-bold'>Description:</h3>
                    <p>{postDescription}</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <h3 className='mb-1 font-bold'>Content type:</h3>
                    <p>{contentType}</p>
                </div>              
            </div>
        </div>
    )
}

export default PostDetails
