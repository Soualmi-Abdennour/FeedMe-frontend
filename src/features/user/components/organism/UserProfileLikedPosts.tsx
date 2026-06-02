"use client"
import React from 'react'
import ProfilePosts from '../molecules/ProfilePosts'
import { useGetUserLikedPostsQuery } from '../../store/user.api.slice'
import { convertPostDbModelToPostAppModel } from '@/features/studio-and-publication/utils/post.utils'

function UserProfileLikedPosts() {
    const {data,isError,isLoading}=useGetUserLikedPostsQuery()
    const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) :[] 
    
  return (
      <ProfilePosts posts={posts} isLoading={isLoading} isError={isError} sameUser={false}  />
  )
}

export default UserProfileLikedPosts
