import { convertPostDbModelToPostAppModel } from '@/features/studio-and-publication/utils/post.utils'
import { useGetOtherUserPostsQuery } from '../../store/user.api.slice'
import ProfilePosts from '../molecules/ProfilePosts'

function OtherUserProfilePosts({userName}:{userName:string}) {
  const { data, isError, isLoading } = useGetOtherUserPostsQuery({userName: userName})
  const posts = data?.data?.posts ? data.data.posts.map((post) => convertPostDbModelToPostAppModel(post)) : []
  return (
    <ProfilePosts posts={posts} isLoading={isLoading} isError={isError} sameUser={false} />
  )
}

export default OtherUserProfilePosts
