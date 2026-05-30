"use client"
import { PostsResponse } from '@/types/api.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useGetPublicationPostsQuery } from '../../store/publication.api.slice'
import { PostAppModel } from '../../types/studio.types'
import { convertPostDbModelToPostAppModel } from '../../utils/post.utils'
import EndOfFeed from '../atoms/EndOfFeed'
import ReelLoadingSpinner from '../atoms/ReelLoadingSpinner'
import ReelsSkeleton from '../atoms/ReelsSkeleton'
import PostWrapper from '../organism/PostWrapper'
import ReelSnapItem from '../organism/ReelSnapItem'
import { useSearchParams } from 'next/navigation'



const REEL_LIMIT=10
export default function ReelsPage() {
    const params=useSearchParams()
    const [reels, setReels] = useState<PostAppModel[]>([])
    const [cursor, SetCursor] = useState<string | undefined>(undefined)
    const [hasMore, setHasMore] = useState(true)
    const isFetchingMore = useRef(false)
    const fetchResponse = useGetPublicationPostsQuery(
        {  cursor },
        { skip: !hasMore }
    )
    const {data,isFetching,isLoading}=fetchResponse
    const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
    const successResponse: PostsResponse = fetchResponse.data as PostsResponse
    if (error) {                        
                const errorResponse = error.data as PostsResponse            
                if (!errorResponse || errorResponse.status === "ERROR") {
                    toast.error("Something Went wrong.")
                }
                else {                
                    toast.error(errorResponse.errors?.at(0)?.message?? errorResponse.message)
                }
            }
    useEffect(() => {
        if (!successResponse || isFetching) return
        const posts = successResponse.data!.posts.map((post) => convertPostDbModelToPostAppModel(post))
        if (posts.length === 0) {
            setHasMore(false)
            isFetchingMore.current = false
            return
        }

        setReels(prev => {
            const existingIds = new Set(prev.map(r => r.id))
            const fresh = posts.filter(r => !existingIds.has(r.id))
            return [...prev, ...fresh]
        })

        if (posts.length < REEL_LIMIT) {
            setHasMore(false)
        }

        isFetchingMore.current = false
    }, [data, isFetching])

    const containerRef = useRef<HTMLDivElement>(null)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const loadMore = useCallback(() => {
        if (isFetchingMore.current || !hasMore || isFetching) return
        if (reels.length === 0) return

        isFetchingMore.current = true
        const last = reels[reels.length - 1]

        SetCursor((last as any).createdAt ?? last.id)
    }, [hasMore, isFetching, reels])

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) loadMore()
            },
            {
                root: containerRef.current,
                rootMargin: '0px 0px 200px 0px',
                threshold: 0,
            }
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [loadMore])


    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                container.scrollBy({ top: container.clientHeight, behavior: 'smooth' })
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                container.scrollBy({ top: -container.clientHeight, behavior: 'smooth' })
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                ref={containerRef}
                className="w-full h-full overflow-y-scroll overflow-x-hidden"
                style={{
                    scrollSnapType: 'y mandatory',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {isLoading && reels.length === 0 ? (
                    <ReelsSkeleton />
                ) : (
                    reels.map(reel => (
                        <ReelSnapItem key={reel.id}>
                            <PostWrapper post={reel} />
                        </ReelSnapItem>
                    ))
                )}

                {isFetching && reels.length > 0 && (
                    <ReelSnapItem>
                        <ReelLoadingSpinner />
                    </ReelSnapItem>
                )}

                {!hasMore && reels.length > 0 && (
                    <ReelSnapItem>
                        <EndOfFeed />
                    </ReelSnapItem>
                )}
                {/* no reels in the db  */}
                {reels.length === 0 && (
                    <ReelSnapItem>
                        <EndOfFeed />
                    </ReelSnapItem>
                )}

                <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
            </div>
        </div>
    )
}





