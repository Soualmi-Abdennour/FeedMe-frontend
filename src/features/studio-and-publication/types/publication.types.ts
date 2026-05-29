import { UserAppModel, UserDbModel } from "@/features/user/types/user.types"

type CommentModel={
    id: string
    text: string
    postId: string
    createdAt: Date
    updatedAt: Date
}
export type CommentDbModel =CommentModel & {
    user:UserDbModel
}
export type CommentAppModel = CommentModel & {
    user:UserAppModel
}