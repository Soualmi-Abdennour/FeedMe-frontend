import { UserAppModel, UserDbModel } from "@/features/user/types/user.types";
import { MediaAppModel, MediaDbModel } from "./media.types";

export type MediaType = "IMAGE"  | "VIDEO" |"NONE"
export type PostFilterOptionKey = "IMAGE" | "MULTI_IMAGE" | "VIDEO"
export type PostsFilterOptionValue = "Image" | "Multi-Image" | "Video"
export type PostsFilterOption = {
    key: PostFilterOptionKey
    value: PostsFilterOptionValue
    label:string
}

export type PostFormData = {
    title: string;
    description: string;
    contentType: string;
    mediaList: MediaAppModel[];
};

type PostModel = {
    id: string;
    title: string;
    description: string;
    video: string | null;        
    contentType: "RECIPE" | "DISH";
    mediaType: MediaType;  
    isPinned: boolean;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
    isLiked?:boolean;
    isSaved?:boolean
}
export type PostDbModel = PostModel & {
    User: UserDbModel
    media: MediaDbModel[];
}

export type PostAppModel = PostModel & {
    user: UserAppModel
    media: MediaAppModel[]
}

