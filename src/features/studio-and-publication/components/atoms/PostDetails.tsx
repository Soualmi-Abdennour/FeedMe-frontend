"use client"
import React, { useState } from 'react'
import { IPostDetails } from '../../types/props.types'
import { cn } from '@/utils/shadcn.utils'
import { CONTENT_TYPE } from '@/constants/app.constants'
import Image from 'next/image'
import Link from 'next/link'
import { ChefHat } from 'lucide-react'

const MAX_DESC = 120

function PostDetails({ postTitle, postDescription, contentType, className, userPhoto, username, userSlug }: IPostDetails) {
    const [expanded, setExpanded] = useState(false)

    const isLong = postDescription?.length > MAX_DESC
    const displayedDesc = expanded || !isLong
        ? postDescription
        : postDescription?.slice(0, MAX_DESC) + '...'

    const contentLabel = CONTENT_TYPE.find(item => item.key === contentType)?.label
//console.log("username and posttitle in PostDetails:", username, postTitle);
    return (
        <div className={cn(
            'flex flex-col rounded-2xl overflow-hidden',
            'bg-white/90 backdrop-blur-md border border-white/40 shadow-xl',
            className
        )}>

            {/* Header — user cliquable */}
            {(userPhoto || username) && (
                <Link href={`/profile/${userSlug ?? username}`} className="flex items-center gap-3 px-6 py-4 border-b border-black/5 shrink-0 hover:opacity-80 transition-opacity">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-orange-100 shrink-0">
                        {userPhoto ? (
                            <Image src={userPhoto} fill alt={username || ''} className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-orange-400 font-semibold text-sm">
                                {username?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">{username}</span>
                        {postTitle && (
                            <p className="line-clamp-1 text-xs text-gray-400 mt-0.5">{postTitle}</p>
                        )}
                    </div>
                </Link>
            )}

            {/* Body */}
            <div
                className="flex flex-col gap-4 px-6 py-5 overflow-y-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 mb-1">Title</p>
                    <p className="text-sm font-medium text-gray-800 leading-snug">{postTitle}</p>
                </div>

                <div className="h-px bg-black/5" />

                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 mb-1">Description</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {displayedDesc}
                        {isLong && (
                            <button
                                onClick={() => setExpanded(s => !s)}
                                className="ml-1 text-orange-500 font-semibold text-xs hover:underline"
                            >
                                {expanded ? 'Show less' : 'Read more'}
                            </button>
                        )}
                    </p>
                </div>

                <div className="h-px bg-black/5" />

                <div className="flex items-center gap-2">
                    <ChefHat size={15} className="text-orange-400" />
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">Content type</p>
                    <span className="ml-auto text-xs font-semibold bg-orange-50 text-orange-500 border border-orange-200 px-3 py-1 rounded-full">
                        {contentLabel}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PostDetails