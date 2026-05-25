import React from 'react'
import ProfilePosts from '../molecules/ProfilePosts'
import { useGetMyPostsQuery } from '@/features/studio-and-publication/store/studio.api.slice'
import { convertPostDbModelToPostAppModel } from '@/features/studio-and-publication/utils/post.utils'

function UserProfilePosts({userId}:{userId:string}) {
    const {data,isError,isLoading}=useGetMyPostsQuery()
      const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) :[] 
  return (
      <ProfilePosts posts={posts} isLoading={isLoading} isError={isError} />
  )
}

export default UserProfilePosts
