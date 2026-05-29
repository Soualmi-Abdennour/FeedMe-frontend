import Image from 'next/image'
import { IPostComment } from '../../types/props.types'


function PostComment({user,text,createdAt}:IPostComment) {   
        let profileImageUrl
        if(user.role==="USER"){
            profileImageUrl=user.profile?.userBasicInformation.profileImageUrl
        }else {
            profileImageUrl = user.profile?.restaurantBasicInformation.restaurantLogoUrl  
        }
    return (
        <div className='flex gap-2 items-start'>
            <div className='size-8  rounded-full shrink-0'>
                <Image src={profileImageUrl?? "/default/default-profile-image.png"} alt='/' width={32} height={32} className='object-cover w-full h-full'></Image>
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
