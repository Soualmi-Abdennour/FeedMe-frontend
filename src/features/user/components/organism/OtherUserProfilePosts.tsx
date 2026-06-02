import { convertPostDbModelToPostAppModel } from '@/features/studio-and-publication/utils/post.utils'
import { useGetOtherUserPostsQuery } from '../../store/user.api.slice'
import ProfilePosts from '../molecules/ProfilePosts'

function OtherUserProfilePosts({userId}:{userId:string}) {
  const { data, isError, isLoading } = useGetOtherUserPostsQuery({userId})
  const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) : []
  return (
    <ProfilePosts posts={posts} isLoading={isLoading} isError={isError}  />
  )
}

export default OtherUserProfilePosts
