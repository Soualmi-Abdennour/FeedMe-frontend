"use client"
import { useState } from 'react'
import { PostAppModel } from '../../types/studio.types'
import PostDetails from '../atoms/PostDetails'
import PostActionsSideBar from '../molecules/PostActionsSideBar'
import PostComments from '../molecules/PostComments'
import PostItem from '../molecules/PostItem'

function PostWrapper({ post }: { post: PostAppModel }) {
    const [showDetails, setShowDetails] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [commentsCount, setCommentsCount] = useState<number>(post.commentCount)

    const userPhoto = post.user.role === "USER"
        ? post.user.profile?.userBasicInformation?.profileImageUrl
        : post.user.profile?.restaurantBasicInformation?.restaurantLogoUrl

    const userDisplayName = post.user.role === "USER"
        ? post.user.profile?.userBasicInformation?.fullName ?? post.user.userName
        : post.user.profile?.restaurantBasicInformation?.restaurantName ?? post.user.userName

    return (
        <div className="flex h-full items-center justify-center gap-4">

            {showDetails && (
                <PostDetails
                    className="self-center h-full w-[400px]"
                    postTitle={post.title}
                    postDescription={post.description}
                    contentType={post.contentType}
                    userPhoto={userPhoto} 
                    userName={userDisplayName}
                    userSlug={post.user.userName}

                />
            )}

            <div className="flex h-full items-center justify-center gap-4 shrink-0 w-[400px]">
                <PostItem post={post} />
                <PostActionsSideBar
                    toggleComments={() => setShowComments(s => !s)}
                    toggleDetails={() => setShowDetails(s => !s)}
                    postId={post.id}
                    commentsCount={commentsCount}
                    likesCount={post.likeCount}
                    isLiked={!!post.isLiked}
                    isSaved={!!post.isSaved}
                />
            </div>

            {showComments && (
                <PostComments
                        post={post}
                    setCommentsCount={setCommentsCount}
                    className="self-center h-full w-[400px]"
                />
            )}
        </div>
    )
}

export default PostWrapper