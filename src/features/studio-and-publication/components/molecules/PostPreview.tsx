"use client"
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Images, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IPostPreviewProps } from '../../types/props.types'
import Image from 'next/image'
import { Image as ImageIcon } from "lucide-react"

function PostPreview({ media, postId, mediaType }: IPostPreviewProps) {
    const [showList, setShowList] = useState<boolean>(false)
    console.log(media[0].previewUrl);
    

    return (
        <div className='relative flex items-center justify-center w-full aspect-[9/16] overflow-hidden rounded-xl bg-black'>
            <button
                className='absolute top-2 right-2 z-10'
                onClick={() => setShowList(state => !state)}
            >
                <EllipsisVertical className='size-6 text-white' />
            </button>

            {showList && (
                <div className='flex flex-col gap-1 absolute top-2 right-10 z-10'>
                    <Link href={`/studio?action=edit&id=${postId}`}>
                        <Button className='w-full' size="sm">Edit</Button>
                    </Link>
                    <Link href={`/studio?action=delete&id=${postId}`}>
                        <Button size="sm">Delete</Button>
                    </Link>
                </div>
            )}

            <div className='absolute top-2 left-2 z-10'>
                {mediaType === "VIDEO" ? (
                    <Video size={20} className='text-white' />
                ) : media.length > 1 ? (
                    <div className='flex gap-1 items-center'>
                        <Images size={20} className='text-white' />
                        <span className='text-white text-sm font-medium'>{media.length}</span>
                    </div>
                ) : (
                    <ImageIcon size={20} className='text-white' />
                )}
            </div>

            {mediaType === "VIDEO" ? (
                <video
                    src={media[0].previewUrl}
                    className='absolute inset-0 w-full h-full object-cover'
                />
            ) : (
                <Image
                    src={media[0].previewUrl}
                    fill
                    alt=''
                    className='object-cover'
                    sizes='(max-width: 768px) 50vw, 33vw'
                />
            )}
        </div>
    )
}

export default PostPreview