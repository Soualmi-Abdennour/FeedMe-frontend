"use client"
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Images, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IPostPreviewProps } from '../../types/props.types'
import Image from 'next/image'
import { Image as ImageIcon } from "lucide-react"

function PostPreview({ media, postId, mediaType,sameUser=true}: IPostPreviewProps) {    
    const [showList, setShowList] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            const handleOutside = (e: MouseEvent) => {
                if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                    setShowList(false);
                }
            };
            document.addEventListener("mousedown", handleOutside);
            return () => document.removeEventListener("mousedown", handleOutside);
        }, []);

    return (
        <div className='relative flex items-center justify-center w-full aspect-[9/16] overflow-hidden rounded-xl bg-black'>
            {sameUser && <button
                className='absolute top-2 right-2 z-10'
                onClick={() => setShowList(state => !state)}
            >
                <EllipsisVertical className='size-6 text-white' />
            </button>}
            {showList && sameUser && (
                <div ref={menuRef} className="absolute top-8 right-2 mt-1 w-28 bg-white rounded-xl shadow-lg  border-neutral-100 overflow-hidden z-20 border-2">
                    <Link href={`/studio?action=edit&id=${postId}`}>
                        <button className="w-full text-left px-4 py-2  text-sm font-medium text-gray-700 hover:bg-neutral-50">Edit</button>
                    </Link>
                    <Link href={`/studio?action=delete&id=${postId}`}>
                        <button className="w-full text-left font-medium px-4 py-2 text-sm text-fail-500 hover:bg-fail-50">Delete</button>
                    </Link>
                </div>
            )}
            <div className='absolute items-center top-3 left-3 z-10'>
            {
                mediaType==="VIDEO"? (
                    <Video size={26} className='text-white'></Video>
                ):media.length>1?(
                    <div className='flex gap-2'>
                        <Images size={26} className='text-white'></Images>
                        <h1 className='text-white text-2xl'>{media.length}</h1>
                    </div>
                ) : (
                    <ImageIcon size={26} className='text-white' />
                )}
            </div>

            {mediaType === "VIDEO" ? (
                <video
                    src={media?.[0]?.previewUrl}
                    className='absolute inset-0 w-full h-full object-cover'
                />
            ) : (
                <Image
                    src={media?.[0]?.previewUrl|| "/placeholder.png"}
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