import { UserAppModel, UserDbModel } from "@/features/user/types/user.types";
import { MediaAppModel, MediaDbModel } from "./media.types";

export type MediaType = "IMAGE"  | "VIDEO" |"NONE"
export type PostMediaType = "IMAGE" | "MULTI_IMAGE" | "VIDEO"
export type PostsFilterOption = {
    key: PostMediaType
    value: "Image" | "Multi-Image" | "Video"
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
}
export type PostDbModel = PostModel & {
    User: UserDbModel
    media: MediaDbModel[];
}

export type PostAppModel = PostModel & {
    user: UserAppModel
    media: MediaAppModel[]
}

