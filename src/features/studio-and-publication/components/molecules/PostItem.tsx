import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {  PostAppModel, PostDbModel } from '@/features/studio-and-publication/types/studio.types'  // adjust import path
import { MediaAppModel } from '@/features/studio-and-publication/types/media.types'  // adjust import path
import VideoMediaPlayer from '../atoms/VideoxMediaPlayer'
import SingleImageMediaPlayer from '../atoms/SingleImageMediaPlayer'
import MultiImageMediaPlayer from '../atoms/MultiImageMediaPlayer'
import { convertMediaDbModelToMediaAppModel } from '../../utils/media.utils'




function PostItem({post} : {post:PostAppModel}) {
const { media,user:{userName,role,profile} } = post
    let profileImage
    if(role==="USER"){
        profileImage=profile?.userBasicInformation.profileImageUrl
    }else {
        profileImage=profile?.restaurantBasicInformation.restaurantLogoUrl
    }    const renderMedia = () => {
        if (!media || media.length === 0) return null

        // Single video
        if (post.mediaType === 'VIDEO' ) {
            return <VideoMediaPlayer media={media} />
        }

        // Multiple images → carousel
        if (media.length > 1) {
            return <MultiImageMediaPlayer mediaList={media} />
        }

        // Single image
        return <SingleImageMediaPlayer media={media} />
    }

    return (
        <div className="relative h-full w-[387px] overflow-hidden rounded-2xl  shadow-xl">

            <div className="absolute inset-0">{renderMedia()}</div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

           

            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 px-4 pb-5">
<div className='size-10  rounded-full shrink-0'>
                <Image src={profileImage ?? "/default/default-profile-image.png"} alt='/' width={40} height={40} className='object-cover w-full h-full rounded-full'></Image>
            </div>
                <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold text-white">{userName}</p>
                    {post.title && (
                        <p className="line-clamp-2 text-xs text-white/70 leading-relaxed mt-0.5">
                            {post.title}
                        </p>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 rounded-full border-2 border-primary-500 bg-white/10 text-primary-500 backdrop-blur-sm hover:bg-primary-500 hover:text-white transition-all"
                >
                    Follow
                </Button>
            </div>
        </div>
    )
}

export default PostItem
