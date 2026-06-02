import { cn } from '@/utils/shadcn.utils'
import { useGetPostCommentsQuery } from '../../store/publication.api.slice'
import PostComment from '../atoms/PostComment'
import CommentTextField from './CommentTextField'
import { IPostComments } from '../../types/props.types'
import { convertCommentDbModelToAppModel } from '../../utils/comment.utils'
import { useEffect, useRef } from 'react'

function PostComments({ className, postId, setCommentsCount }: IPostComments) {
    const fetchResponse = useGetPostCommentsQuery({ postId })
    const { data, isLoading, isError } = fetchResponse
    const commentsTopRef = useRef<HTMLDivElement>(null)

    const comments = data?.data?.comments.map(comment => convertCommentDbModelToAppModel(comment)) ?? []

    useEffect(() => {
        if (comments.length > 0) {
            commentsTopRef.current?.scrollIntoView({ behavior: 'instant' })
        }
    }, [])

    return (
        <div className={cn(
            'flex flex-col rounded-2xl overflow-hidden',
            'bg-white/90 backdrop-blur-md border border-white/40 shadow-xl',  'max-h-[70%]',
            className
        )}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/5 shrink-0">
                <h4 className="text-center font-semibold text-sm tracking-wide text-gray-700">Comments</h4>
            </div>

            {/* Liste */}
            <div
                className="flex-1 flex flex-col gap-4 px-6 py-4 overflow-y-auto min-h-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div ref={commentsTopRef} />

                {isLoading && (
                    <p className="text-center text-gray-400 text-sm">Loading...</p>
                )}
                {isError && (
                    <p className="text-center text-red-400 text-sm">Error while getting the comments</p>
                )}
                {!isLoading && !isError && (
                    <>
                        {comments.length === 0 && (
                            <p className="text-center text-gray-400 text-sm mt-4">No comments yet</p>
                        )}
                        {comments.map((comment, index) => (
                            <PostComment key={index} commentId={comment.id} {...comment} />
                        ))}
                    </>
                )}
            </div>

            {/* Input fixe en bas */}
            <div className="px-6 py-4 border-t border-black/5 shrink-0">
                <CommentTextField postId={postId} setCommentsCount={setCommentsCount} />
            </div>
        </div>
    )
}

export default PostComments