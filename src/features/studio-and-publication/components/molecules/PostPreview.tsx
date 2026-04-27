"use client"
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Images, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { IPostPreviewProps } from '../../types/props.types'
import Image from 'next/image'
import {Image as ImageIcon} from "lucide-react"

function PostPreview({ media, postId, mediaType }: IPostPreviewProps) {
    const [showList, setShowList] = useState<boolean>(false)

    return (
        <div className='relative flex items-center justify-center w-[320px] h-[600px] overflow-hidden rounded-xl bg-black'>
            <button
                className='absolute top-3 right-3 z-10'
                onClick={() => setShowList(state => !state)}
            >
                <EllipsisVertical className='size-10 text-white' />
            </button>

            {showList && (
                <div className='flex flex-col gap-1 justify-center absolute top-3 right-16 z-10'>
                    <Link href={`/home/studio?action=edit&id=${postId}`}>
                        <Button className='w-full m-1 text-white font-medium'>Edit</Button>
                    </Link>
                    <Link href={`/home/studio?action=delete&id=${postId}`}>
                        <Button className='w-full m-1 text-white font-medium'>Delete</Button>
                    </Link>
                </div>
            )}
            <div className='absolute items-center top-3 left-3 z-10'>
            {
                mediaType==="VIDEO"? (
                    <Video size={30} className='text-white'></Video>
                ):media.length>1?(
                    <div className='flex gap-2'>
                        <Images size={30} className='text-white'></Images>
                        <h1 className='text-white text-2xl'>{media.length}</h1>
                    </div>
                ):(
                    <ImageIcon size={30} className='text-white'></ImageIcon>
                )
            }
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
                />
            )}
        </div>
    )
}

export default PostPreview