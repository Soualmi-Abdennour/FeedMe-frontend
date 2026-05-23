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




function PostItem({post} : {post:PostDbModel}) {
    const { media, userId, likeCount, commentCount } = post

    // Resolve which media renderer to use
    const renderMedia = () => {
        if (!media || media.length === 0) return null

        // Single video
        if (post.mediaType === 'VIDEO' ) {
            return <VideoMediaPlayer media={convertMediaDbModelToMediaAppModel(media)} />
        }

        // Multiple images → carousel
        if (media.length > 1) {
            return <MultiImageMediaPlayer mediaList={convertMediaDbModelToMediaAppModel(media)} />
        }

        // Single image
        return <SingleImageMediaPlayer media={convertMediaDbModelToMediaAppModel(media)} />
    }

    return (
        <div className="relative h-[600px] w-[387px] overflow-hidden rounded-2xl bg-black shadow-2xl">

            {/* ── Media layer ── */}
            <div className="absolute inset-0">{renderMedia()}</div>

            {/* ── Gradient scrim ── */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

           

            {/* ── Bottom info bar ── */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 px-4 pb-5">
                {/* Avatar */}
                <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 ring-2 ring-white/30" />

                {/* Username + description */}
                <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold text-white">{userId}</p>
                    {post.description && (
                        <p className="line-clamp-2 text-xs text-white/70 leading-relaxed mt-0.5">
                            {post.title}
                        </p>
                    )}
                </div>

                {/* Follow button */}
                <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 rounded-full border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black transition-all"
                >
                    Follow
                </Button>
            </div>
        </div>
    )
}

export default PostItem