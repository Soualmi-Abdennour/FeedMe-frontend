import { mapUserDbToAppModel } from "@/features/user/utils/user.utils";
import { CommentAppModel, CommentDbModel } from "../types/publication.types";

export function convertCommentDbModelToAppModel(comment:CommentDbModel):CommentAppModel{
    return {
        ...comment,
        user:mapUserDbToAppModel(comment.user)
    }
}