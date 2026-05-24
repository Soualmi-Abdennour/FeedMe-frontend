import Image from 'next/image'
import React from 'react'
import { IPostComment } from '../../types/props.types'
import { NormalUserProfileAppModel, RestaurantUserProfileAppModel } from '@/features/user/types/user.types'


function PostComment({user,text,createdAt}:IPostComment) {   
    
    var profileImageUrl:string=""
        if(user.role==="USER"){
            const profile =user.profile! as NormalUserProfileAppModel
            profileImageUrl=profile.userBasicInformation.profileImageUrl?? ""
        }else {
            const profile = user.profile! as RestaurantUserProfileAppModel
            profileImageUrl = profile.restaurantBasicInformation.restaurantLogoUrl ?? ""  
        }
    return (
        <div className='flex gap-2 items-start'>
            <div className='size-8 bg-orange-500 rounded-full shrink-0'>
                {/* <Image src={profileImageUrl} alt='/' width={32} height={32} className='object-cover'></Image> */}
            </div>
            <div className='flex flex-col items-start justify-between py-0.5'>
                <h6 className='font-medium text-xs text-[#404040]'>
                    {user.userName}
                    <span>{"  "+ new Date(createdAt).toLocaleDateString()}</span>
                </h6>
                <p className='font-normal text-sm text-[#181818]'>{text}</p>
            </div>
        </div>
    )
}

export default PostComment
