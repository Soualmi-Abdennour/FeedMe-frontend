import React from 'react'
import ProfilePosts from '../molecules/ProfilePosts'
import { useGetUserSavedPostsQuery } from '../../store/user.api.slice'
import { convertPostDbModelToPostAppModel } from '@/features/studio-and-publication/utils/post.utils'

function UserProfileSavedPosts() {
  const {data,isError,isLoading}=useGetUserSavedPostsQuery()
  const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) :[] 
  return (
    <ProfilePosts posts={posts} isLoading={isLoading} isError={isError} />
  )
}

export default UserProfileSavedPosts
