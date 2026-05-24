import { cn } from '@/utils/shadcn.utils'
import { useGetPostCommentsQuery } from '../../store/publication.api.slice'
import PostComment from '../atoms/PostComment'
import CommentTextField from './CommentTextField'
import { IPostComments } from '../../types/props.types'
import { convertCommentDbModelToAppModel } from '../../utils/comment.utils'

const COMMENTS = [
    {
        userName: "almando19",
        profileImageUrl: "/",
        comment: "this is a good dish"
    },
    {
        userName: "yoo_fj",
        profileImageUrl: "/",
        comment: "I don't like how it appears in the photo"
    },
    {
        userName: "fieldmarschall",
        profileImageUrl: "/",
        comment: "please subscribe to my channel"
    },
    {
        userName: "xxx_00",
        profileImageUrl: "/",
        comment: "..."
    },
    {
        userName: "M_I_L",
        profileImageUrl: "/",
        comment: "How to order this?"
    }
]

function PostComments({ className, postId,setCommentsCount }: IPostComments) {
    const fetchResponse = useGetPostCommentsQuery({ postId })
    const { data, isLoading, isError } = fetchResponse    
    
    const comments = data?.data?.comments.map(comment=>convertCommentDbModelToAppModel(comment)) ?? []
    return (
        <div className={cn('flex gap-8 flex-col max-h-[444px] w-[346px] bg-[#F8F8F8] rounded-md p-6 ', className)}>
            <h4 className='text-center  font-normal text-lg'>Post Comments</h4>
            <div className='flex flex-col gap-6 overflow-y-auto'>
                {isLoading && (
                    <p className="text-center text-gray-400">Loading ...</p>                   
                )}
                {isError && (                 
                    <p className="text-center  text-red-400 ">Error while getting the comments</p>
                )}
                {!isLoading && !isError && (
                    <>
                        {comments.map((comment, index) => (
                            <PostComment key={index} {...comment}></PostComment>
                        ))}
                        {comments.length === 0 && (
                            <p className="col-span-3 text-center mt-10 text-gray-400  ">
                                No Comments are available
                            </p>
                        )}
                    </>
                )}
            </div>
            <CommentTextField postId={postId} setCommentsCount={setCommentsCount}></CommentTextField>
        </div>
    )
}

export default PostComments
