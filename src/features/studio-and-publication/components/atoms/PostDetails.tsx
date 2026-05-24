import React from 'react'
import { IPostDetails } from '../../types/props.types'
import { cn } from '@/utils/shadcn.utils'


function PostDetails({postTitle,postDescription,contentType,className}:IPostDetails) {
    return (
        <div className={cn('flex gap-8 flex-col max-h-[444px] w-[346px] bg-[#F8F8F8] rounded-md p-6 ', className)}>
            <h4 className='text-center  font-normal text-lg'>Post Details</h4>
            <div className='flex-1 overflow-y-auto space-y-5 '>
                <div>
                    <h6 className='mb-1 font-bold'>Title:</h6>
                    <p className='text-sm font-normal p-1 text-[#404040]'>{postTitle}</p>
                </div>
                <div>
                    <h6 className='mb-1 font-bold'>Description:</h6>
                    <p className='text-sm font-normal p-1 text-[#404040]'>
                        {postDescription}
                    </p>
                </div>
                <div className='flex gap-2 items-center'>
                    <h6 className='mb-1 font-bold'>Content type:</h6>
                    <p className='font-normal text-sm text-[#404040]'>{contentType}</p>
                </div>              
            </div>
        </div>
    )
}

export default PostDetails
