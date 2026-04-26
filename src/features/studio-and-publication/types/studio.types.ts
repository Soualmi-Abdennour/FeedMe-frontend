import { MediaAppModel, MediaDbModel } from "./media.types";

export type PostMediaType = "IMAGE" | "MULTI_IMAGE" | "VIDEO"
export type PostsFilterOption={
    key: PostMediaType
    value:"Image" | "Multi-Image" | "Video"
}


export type PostFormData = {
    title: string;
    description: string;
    contentType: string;
    mediaList: MediaAppModel[];
};


export type PostDbModel ={
    id:string;
    title:string;
    description:string;
    contentType:"RECIPE" |"DISH";
    mediaType: PostMediaType;
    isPinned:boolean;
    likeCount:number;
    commentCount:number;
    userId:string;
    createdAt:Date;
    updatedAt:Date;
    media:MediaDbModel[]
}

export type PostAppModel= Exclude<PostDbModel,"media"> & {
    media:MediaAppModel[]
}