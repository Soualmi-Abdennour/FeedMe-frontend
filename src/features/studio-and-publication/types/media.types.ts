

export type MediaType = "IMAGE" | "VIDEO"
export type MediaAppModel ={
    id: string                  
    previewUrl: string          
    type: MediaType
    source: "EXISTING" | "NEW"
    file?: File
}

export type MediaDbModel ={
    id:string;
    url:string;
    type: MediaType
    order:number;
    postId:string;
    createdAt:Date;
    updatedAt:Date;
}