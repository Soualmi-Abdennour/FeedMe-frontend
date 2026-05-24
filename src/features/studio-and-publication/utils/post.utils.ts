import { mapUserDbToAppModel } from "@/features/user/utils/user.utils";
import { PostAppModel, PostDbModel } from "../types/studio.types";
import { convertMediaDbModelToMediaAppModel } from "./media.utils";

export function convertPostDbModelToPostAppModel(
    post: PostDbModel
): PostAppModel {
    return {
        ...post,
        user:mapUserDbToAppModel(post.User),
        media: convertMediaDbModelToMediaAppModel(post.media),
    };
}