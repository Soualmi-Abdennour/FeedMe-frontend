import { cn } from '@/utils/shadcn.utils'
import React, { useRef, useState, useLayoutEffect } from 'react'
import { IMediaGalleryProps } from '../../types/props.types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

const VISIBLE_COUNT = 3 // how many items are visible at a time

function MediaPreviewGallery({ uploadedMedia, setUploadedMedia, className }: IMediaGalleryProps) {
    const [startIndex, setStartIndex] = useState(0)
    const itemRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState(0)

    // Measure the actual rendered width (including gap) of one item
    useLayoutEffect(() => {
        if (itemRef.current) {
            // getBoundingClientRect gives the real pixel width of the element.
            // We add the gap (8px = gap-2) to get the stride per step.
            setItemWidth(itemRef.current.getBoundingClientRect().width + 8)
        }
    }, [uploadedMedia])

    const canGoPrev = startIndex > 0
    const canGoNext = startIndex < uploadedMedia.length - VISIBLE_COUNT

    const offsetPx = startIndex * itemWidth

    return (
        <div className="w-full   relative z-0 justify-center">
            {canGoPrev && <button
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2   rounded-full  text-primary-500 "
                onClick={() => setStartIndex(i => i - 1)}
            >
                <ChevronLeft size={38} />
            </button>}

            {canGoNext && <button
                className="absolute -right-3 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full  text-primary-500 "
                onClick={() => setStartIndex(i => i + 1)}
            >
                <ChevronRight size={38} />
            </button>}
            <div
                style={{ width: itemWidth > 0 ? `${itemWidth * VISIBLE_COUNT - 8 }px` : "auto" }}
                className="overflow-hidden mx-auto"
            >
                <div
                    className={cn('flex gap-2 w-fit  transition-transform duration-300', className)}
                    style={{ transform: `translateX(-${offsetPx}px)` }}
                >
                    {uploadedMedia.map((media, index) =>
                        media.type === "IMAGE" ? (
                            <div
                                key={media.previewUrl}
                                ref={index === 0 ? itemRef : undefined}
                                className="h-40 w-32 shrink-0 relative shadow-sm rounded-md overflow-hidden"
                            >
                                <button className='absolute rounded-full bg-primary-500 top-1 right-1 z-10 text-white p-1'
                                    onClick={() => setUploadedMedia(previousMediaList => previousMediaList.filter((prevMedia) => prevMedia.id !== media.id))}
                                >
                                    <X size={15}></X>
                                </button>
                                <Image
                                    src={media.previewUrl}
                                    alt="preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div
                                key={media.previewUrl}
                                ref={index === 0 ? itemRef : undefined}
                                className="h-40 w-32 shrink-0 relative shadow-sm rounded-md overflow-hidden"
                            >
                                    <button className='absolute rounded-full bg-primary-500 top-1 right-1 z-10 text-white p-1'
                                        onClick={() => setUploadedMedia(previousMediaList => previousMediaList.filter((prevMedia) => prevMedia.id !== media.id))}
                                    >
                                        <X size={15}></X>
                                    </button>
                                <video
                                    src={media.previewUrl}
                                    autoPlay
                                    muted
                                    loop
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default MediaPreviewGallery