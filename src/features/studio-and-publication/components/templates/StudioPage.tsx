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
import { useGetMyPostsQuery } from '../../store/studio.api.slice'  // ← الجديد
import { Plus } from 'lucide-react'
import { PostAppModel, PostsFilterOption, PostsFilterOptionValue } from '../../types/studio.types'
import { convertPostDbModelToPostAppModel } from '../../utils/post.utils'
import { filterPosts } from '../../utils/filter.utils'
import PostWrapper from '../organism/PostWrapper'
import { PostDetailPopup } from '../molecules/PostDetailPopup'
import { useEffect } from 'react'

function StudioPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [filterOptions, setFilterOptions] = useState<PostsFilterOptionValue[]>(['Image', "Multi-Image", "Video"])
    const [openCreatePostForm, setOpenCreatePostForm] = useState<boolean>(false)
    const { data, isLoading, isError } = useGetMyPostsQuery()
    const [isProcess, setIsProcess] = useState<boolean>(false)
    const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) : []
    const [postToShow, setPostToShow] = useState<PostAppModel | null>(null)
    useEffect(() => {
        if ((searchParams.get("action") === "delete" && searchParams.get("id")) || (searchParams.get("action") === "edit" && searchParams.get("id"))) {
            setPostToShow(null)
        }
    }, [searchParams]);



    return (
        <div className='relative z-0 w-full px-32  h-full'>
            <header className="flex justify-between items-center shrink-0 py-4 px-6">                <Button
                onClick={() => setOpenCreatePostForm(true)}
                variant="ghost"
                className="flex items-center gap-2 px-5 py-4 border-2 border-primary-400 text-primary-500 rounded-full text-sm font-semibold hover:bg-primary-50 transition"
            >
                <Plus size={26}></Plus>
                Create Post
            </Button>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Studio
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        Your Creative Space
                    </p>
                </div>
                <DropdownSelect
                    menuLabel='Filter by '
                    currentValue={filterOptions}
                    selectOptions={POSTS_FILTER_OPTIONS}
                    onChange={(value: PostsFilterOptionValue) => {
                        setFilterOptions(state =>
                            state.includes(value)
                                ? state.filter(val => val !== value)
                                : [...state, value]
                        )
                    }}
                />
            </header>
            <div className='mt-10 h-full  overflow-y-auto'>
                {isLoading && (
                    <p className="text-center mt-10 text-gray-400">Loading ...</p>
                )}
                {isError && (
                    <p className="text-center mt-10 text-red-400 ">Error while getting the posts</p>
                )}
                {!isLoading && !isError && (
                    <div className='grid grid-cols-3 gap-3 '>
                        {filterPosts({ posts, selectFilterOptions: filterOptions })
                            .map(({ mediaType, media, id, user }) => (
                                <div key={id} className="cursor-pointer" onClick={() => setPostToShow(posts.find(post => post.id === id) ?? null)}>
                                    <PostPreview
                                    mediaType={mediaType}
                                    media={media}
                                    postId={id}
                                    ownerId={user.id}
                                    />
                                </div>
                            ))
                        }
                        {posts.length === 0 && (
                            <p className="col-span-3 text-center mt-10 text-gray-400  ">
                                No posts are available
                            </p>
                        )}
                    </div>
                )}
            </div>
            {openCreatePostForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => !isProcess && setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-[900px]  p-6 flex flex-col gap-4">
                        <CreatePostForm onClose={() => setOpenCreatePostForm(false)} setIsProcess={setIsProcess} />
                    </div>
                </div>
            )}
            {searchParams.get("action") === "edit" && searchParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => !isProcess && setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <EditPostForm
                            setIsProcess={setIsProcess}
                            postId={searchParams.get("id")!}
                            onClose={() => router.replace("/studio")}
                        />
                    </div>
                </div>
            )}
            {searchParams.get("action") === "delete" && searchParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => !isProcess && setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeletePostForm
                            setIsProcess={setIsProcess}
                            postId={searchParams.get("id")!}
                            onClose={() => router.replace("/studio")}
                        />
                    </div>
                </div>
            )}


            {postToShow && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm "
                    onClick={() => setPostToShow(null)}
                >
                    <div className="relative  rounded-2xl shadow-2xl overflow-hidden w-full h-full mx-4" >
                        <button
                            onClick={() => setPostToShow(null)}
                            className="absolute top-1/2  right-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-black hover:bg-black/60 transition"
                            aria-label="Close"
                        >
                        </button>
                        <PostDetailPopup post={postToShow} />
                    </div>
                </div>
            )}


        </div>
    )
}

export default StudioPage