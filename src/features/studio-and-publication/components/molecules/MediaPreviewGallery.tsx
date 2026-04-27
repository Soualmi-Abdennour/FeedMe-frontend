import { cn } from '@/utils/shadcn.utils'
import React, { useRef, useState, useLayoutEffect } from 'react'
import { IMediaGalleryProps } from '../../types/props.types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

const VISIBLE_COUNT = 3 // how many items are visible at a time

function MediaPreviewGallery({ uploadedMedia,setUploadedMedia, className }: IMediaGalleryProps) {
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
        <div className="max-w-[600px] overflow-hidden relative px-5 justify-center">
            {canGoPrev  && <Button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                onClick={() => setStartIndex(i => i - 1)}
            >
                <ArrowLeft />
            </Button>}

            {canGoNext && <Button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                onClick={() => setStartIndex(i => i + 1)}
            >
                <ArrowRight />
            </Button>}

            <div
                className={cn('flex gap-2 w-fit px-2 transition-transform duration-300', className)}
                style={{ transform: `translateX(-${offsetPx}px)` }}
            >
                {uploadedMedia.map((media, index) =>
                    media.type==="IMAGE" ? (
                        <div
                            key={media.previewUrl}
                            ref={index === 0 ? itemRef : undefined}
                            className="h-56 w-48 shrink-0 relative border-2 border-primary-500 rounded-md overflow-hidden"
                        >
                            <Button className='absolute top-0 right-[-10px] z-10 text-white'
                            variant='ghost'
                                onClick={()=>setUploadedMedia(previousMediaList=>previousMediaList.filter((prevMedia)=>prevMedia.id!==media.id))}
                            >
                                <X></X>
                            </Button>
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
                            className="h-56 w-48 shrink-0 relative border-2 border-primary-500 rounded-md overflow-hidden"
                        >
                                <Button className='absolute top-0 right-0 z-10 '
                                    onClick={() => setUploadedMedia(previousMediaList => previousMediaList.filter((file) => file.id !== media.id))}
                                >
                                    <X></X>
                                </Button>
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
    )
}

export default MediaPreviewGallery