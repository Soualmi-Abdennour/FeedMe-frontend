import { UserAppModel } from "@/features/user/types/user.types";
import { Dispatch, SetStateAction } from "react";
import { IPostFormSchema } from "../schema/postForm.schema";
import { MediaAppModel } from "./media.types";
import { MediaType, PostAppModel } from "./studio.types";

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
    isLiked:boolean
    isSaved:boolean
}
export interface ICommnetTextField { 
    postId:string 
    setCommentsCount:Dispatch<SetStateAction<number>>
}
export interface IPostComments {
    className ?: string,
    post: PostAppModel 
    setCommentsCount: Dispatch<SetStateAction<number>> 
}

export interface IPostComment {
    text:string
    commentId:string
    createdAt:Date
    user:UserAppModel
    post:PostAppModel
    setCommentsCount :Dispatch<SetStateAction<number>>
}

export interface IPostPreviewProps {
    media:MediaAppModel[],
    mediaType: MediaType
    postId:string
    ownerId:string
} 
export interface IPostFormProps {
    defaultValues?:IPostFormSchema & {
    mediaList:MediaAppModel[]
    };
    onSubmit:(postData:FormData)=>Promise<void>
    onClose:()=>void
}
export interface ICreatePostFormProps {
    className?: string;
    onClose : () => void ;
    isProcess?:boolean;
    setIsProcess:Dispatch<SetStateAction<boolean>>
}
export interface IEditPostFormProps extends ICreatePostFormProps { 
    postId:string
}
export interface IDeletePostFormProps extends IEditPostFormProps {}