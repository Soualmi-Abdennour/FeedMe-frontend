import { PostAppModel, PostsFilterOptionValue } from "../types/studio.types";

export function filterPosts({
    posts,
    selectFilterOptions,
}: {
    posts: PostAppModel[]
    selectFilterOptions: PostsFilterOptionValue[]
}): PostAppModel[] {
    return posts.filter((post) => {
        if (post.mediaType === "VIDEO") {
            return selectFilterOptions.includes("Video")
        }
        if (post.mediaType === "IMAGE") {
            return post.media.length > 1
                ? selectFilterOptions.includes("Multi-Image")
                : selectFilterOptions.includes("Image")
        }
        return false
    })
}