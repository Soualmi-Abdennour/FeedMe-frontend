"use client"
import DropdownSelect from '@/components/molecules/DropdownSelect'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import PostItem from '../molecules/PostItem'
import PostPreview from '../molecules/PostPreview'
import { POSTS_FILTER_OPTIONS } from '../../constants/postsFilter.constants'
import CreatePostForm from '../organism/CreatePostForm'
import { MediaAppModel } from '../../types/media.types'
import { useRouter, useSearchParams } from 'next/navigation'
import EditPostForm from '../organism/EditPostForm'
import DeletePostForm from '../organism/DeletePostForm'
import { MOCK_POSTS } from '../../constants/mockData.contants'
import { convertMediaDbModelToMediaAppModel } from '../../utils/media.utils'
import { PostMediaType } from '../../types/studio.types'



function StudioPage() {
    const seachParams=useSearchParams()
    const router=useRouter()    
    const [filterOptions, setFilterOptions] = useState<PostMediaType[]>(['IMAGE',"MULTI_IMAGE","VIDEO"])
    console.log(filterOptions);
            
    const [openCreatePostFrom, setOpenCreatePostForm] = useState<boolean>(false)
    return (
        <div className='relative z-0 w-full h-screen'>
            <header className='flex justify-between'>
                <Button
                    onClick={() => setOpenCreatePostForm(true)}
                >
                    Create Post
                </Button>
                <DropdownSelect menuLabel='Filter by ' currentValue={filterOptions} selectOptions={POSTS_FILTER_OPTIONS} onChange={(value) => {
                    setFilterOptions(state => state.includes(value) ? state.filter(val => val !== value) : [...state, value])
                }}></DropdownSelect>
            </header>
            <div className='grid grid-cols-3 gap-3 w-fit border border-red-500 overflow-y-scroll h-full'>
                {MOCK_POSTS.filter(({mediaType,media}) => filterOptions.includes(mediaType)).map(({mediaType,media,id}) => (
                    <PostPreview key={id} mediaType={mediaType} media={convertMediaDbModelToMediaAppModel(media)} postId={id}></PostPreview>
                ))}
            </div>
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
                        <EditPostForm postId={seachParams.get("id")!} onClose={() =>router.replace("/home/studio") } />
                    </div>
                </div>
            )}
            {seachParams.get("action") === "delete" && seachParams.get("id") && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpenCreatePostForm(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeletePostForm postId={seachParams.get("id")!} onClose={() =>router.replace("/home/studio") } />
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudioPage
