"use client"
import DropdownSelect from '@/components/molecules/DropdownSelect'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { POSTS_FILTER_OPTIONS } from '../../constants/postsFilter.constants'
import { useGetMyPostsQuery } from '../../store/studio.api.slice'; // ← الجديد
import { PostsFilterOptionValue } from '../../types/studio.types'
import { filterPosts } from '../../utils/filter.utils'
import { convertPostDbModelToPostAppModel } from '../../utils/post.utils'
import PostPreview from '../molecules/PostPreview'
import CreatePostForm from '../organism/CreatePostForm'
import DeletePostForm from '../organism/DeletePostForm'
import EditPostForm from '../organism/EditPostForm'



function StudioPage() {
    const seachParams = useSearchParams()
    const router = useRouter()
    const [filterOptions, setFilterOptions] = useState<PostsFilterOptionValue[]>(['Image', "Multi-Image", "Video"])
    const [openCreatePostFrom, setOpenCreatePostForm] = useState<boolean>(false)
    const { data, isLoading, isError } = useGetMyPostsQuery()
    const [isProcess,setIsProcess]=useState<boolean>(false)
    const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) : []

    return (
        <div className='relative z-0 w-full px-32 py-24 h-full'>
            <header className='flex justify-between max-h-[56px] items-center  '>
                <Button
                    onClick={() => setOpenCreatePostForm(true)}
                    variant="ghost"
                    className="flex items-center gap-2 px-5 py-2 border-2 border-primary-400 text-primary-500 rounded-full text-sm font-semibold hover:bg-primary-50 transition"
                >
                    <Plus size={26}></Plus>
                    Create Post
                </Button>
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
                            .map(({ mediaType, media, id,user }) => (
                                <PostPreview
                                    key={id}
                                    mediaType={mediaType}
                                    media={media}
                                    postId={id}
                                    ownerId={user.id}
                                />
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
            {openCreatePostFrom && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => !isProcess &&  setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-md  p-6 flex flex-col gap-4">
                        <CreatePostForm onClose={() => setOpenCreatePostForm(false)}  setIsProcess={setIsProcess}/>
                    </div>
                </div>
            )}
            {seachParams.get("action") === "edit" && seachParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => !isProcess && setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <EditPostForm
                            setIsProcess={setIsProcess}
                            postId={seachParams.get("id")!}
                            onClose={() => router.replace("/studio")}
                        />
                    </div>
                </div>
            )}
            {seachParams.get("action") === "delete" && seachParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => !isProcess && setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeletePostForm
                        setIsProcess={setIsProcess}
                            postId={seachParams.get("id")!}
                            onClose={() => router.replace("/studio")}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudioPage