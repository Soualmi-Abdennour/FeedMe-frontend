import { UserAppModel, UserDbModel } from "@/features/user/types/user.types";
import { IPostFormSchema } from "../schema/postForm.schema";
import { MediaAppModel } from "./media.types";
import { PostAppModel } from "./studio.types";
import { Dispatch, SetStateAction } from "react";

export interface IMediaDropZoneProps {
    uploadedMedia:MediaAppModel[]
    setUploadedMedia:React.Dispatch<React.SetStateAction<MediaAppModel[]>>
}
export interface IMediaGalleryProps extends IMediaDropZoneProps {
    className?: string 
}

export interface IPostDetails {
    className?:string;
    postTitle:string;
    postDescription:string;
    contentType:"DISH"|"RECIPE"
}

export interface IPostActionsSideBar {
    toggleComments:()=>void;
    toggleDetails:()=>void;
    postId:string
    commentsCount:number
    likesCount:number
}
export interface ICommnetTextField { 
    postId: string 
    // commentsCount:number
    setCommentsCount:Dispatch<SetStateAction<number>>
}
export interface IPostComments {
    className ?: string,
    postId: string 
    // commentsCount:number
    setCommentsCount: Dispatch<SetStateAction<number>> 
}

export interface IPostComment {
    text:string
    createdAt:Date
    user:UserAppModel
}

export interface IPostPreviewProps {
    media:MediaAppModel[],
    mediaType:"IMAGE"|"MULTI_IMAGE"|"VIDEO"
    postId:string
} 
export interface IPostFormProps {
    defaultValues?:IPostFormSchema & {
        mediaList:MediaAppModel[]
    };
    onSubmit:(postData:FormData)=>Promise<void>
}
export interface ICreatePostFormProps {
    className?: string;
    onClose : () => void ;
}
export interface IEditPostFormProps extends ICreatePostFormProps { 
    postId:string
}
export interface IDeletePostFormProps extends IEditPostFormProps {}