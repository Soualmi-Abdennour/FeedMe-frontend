import { IPostFormSchema } from "../schema/postForm.schema";
import { MediaAppModel } from "./media.types";

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
    // handleSave:()=>Promise<void>;
    // handleLike:()=>Promise<void>;
    handleSave:()=>void;
    handleLike:()=>void;
    toggleComments:()=>void;
    toggleDetails:()=>void;
    likesNumber:number;
    commentsNumber:number;
}

export interface IPostComment {
    userName:string;
    comment:string;
    profileImageUrl:string;
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