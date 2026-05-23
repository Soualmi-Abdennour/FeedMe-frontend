import { PostMediaType } from "../types/studio.types";

export const POSTS_FILTER_OPTIONS=[
    {
        value: "IMAGE" as PostMediaType,
        label:"Image"
    },
    {
        value: "MULTI_IMAGE" as PostMediaType,
        label:"Multi-Image"
    },
    {
        value: "VIDEO" as PostMediaType,
        label:"Video"
    }
] 