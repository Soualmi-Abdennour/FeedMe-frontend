"use client"
import DropdownSelect from '@/components/molecules/DropdownSelect'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import PostPreview from '../molecules/PostPreview'
import { POSTS_FILTER_OPTIONS } from '../../constants/postsFilter.constants'
import CreatePostForm from '../organism/CreatePostForm'
import { useRouter, useSearchParams } from 'next/navigation'
import EditPostForm from '../organism/EditPostForm'
import DeletePostForm from '../organism/DeletePostForm'
import { convertMediaDbModelToMediaAppModel } from '../../utils/media.utils'
import { PostMediaType } from '../../types/studio.types'
import { useGetMyPostsQuery } from '../../store/studio.api.slice'  // ← الجديد



function StudioPage() {
    const seachParams = useSearchParams()
    const router = useRouter()
    const [filterOptions, setFilterOptions] = useState<PostMediaType[]>(['IMAGE', "MULTI_IMAGE", "VIDEO"])
    const [openCreatePostFrom, setOpenCreatePostForm] = useState<boolean>(false)

    // ── جلب البوستات من الباك اند ──────────────────────────────────
    const { data, isLoading, isError } = useGetMyPostsQuery({})
    const posts = data?.data?.posts ?? []

    return (
        <div className='relative z-0 w-full h-screen'>
            <header className='flex justify-between'>
                <Button onClick={() => setOpenCreatePostForm(true)}>
                    Create Post
                </Button>
                <DropdownSelect
                    menuLabel='Filter by '
                    currentValue={filterOptions}
                    selectOptions={POSTS_FILTER_OPTIONS}
                    onChange={(value) => {
                        setFilterOptions(state =>
                            state.includes(value)
                                ? state.filter(val => val !== value)
                                : [...state, value]
                        )
                    }}
                />
            </header>

            {/* ── States ─────────────────────────────────────────── */}
            {isLoading && (
                <p className="text-center mt-10 text-gray-400">جاري التحميل...</p>
            )}
            {isError && (
                <p className="text-center mt-10 text-red-400">حدث خطأ في جلب المنشورات</p>
            )}

            {/* ── Grid ───────────────────────────────────────────── */}
            {!isLoading && !isError && (
                <div className='grid grid-cols-3 gap-3 w-fit overflow-y-scroll h-full'>
                    {posts
                        .filter(({ mediaType }) => filterOptions.includes(mediaType as PostMediaType))
                        .map(({ mediaType, media, id }) => (
                            <PostPreview
                                key={id}
                                mediaType={mediaType as PostMediaType}
                                media={convertMediaDbModelToMediaAppModel(media)}
                                postId={id}
                            />
                        ))
                    }
                    {posts.length === 0 && (
                        <p className="col-span-3 text-center mt-10 text-gray-400">
                            لا توجد منشورات بعد
                        </p>
                    )}
                </div>
            )}

            {/* ── Modals ─────────────────────────────────────────── */}
            {openCreatePostFrom && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <CreatePostForm onClose={() => setOpenCreatePostForm(false)} />
                    </div>
                </div>
            )}
            {seachParams.get("action") === "edit" && seachParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <EditPostForm
                            postId={seachParams.get("id")!}
                            onClose={() => router.replace("/home/studio")}
                        />
                    </div>
                </div>
            )}
            {seachParams.get("action") === "delete" && seachParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeletePostForm
                            postId={seachParams.get("id")!}
                            onClose={() => router.replace("/home/studio")}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudioPage