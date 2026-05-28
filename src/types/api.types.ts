import { ProductDbModel } from "@/features/shop/types/shop.types";
import { CommentDbModel } from "@/features/studio-and-publication/types/publication.types";
import { PostDbModel } from "@/features/studio-and-publication/types/studio.types";
import { UserDbModel } from "@/features/user/types/user.types";

export type ApiStatus = "SUCCESS" | "FAIL" | "ERROR";

export type UserResponseData={
    user:UserDbModel;
    jwtToken?:string
}
export type ProductsResponseData= {
    products: ProductDbModel[];
    nextCursor: string | null;
    results: number;
}
export type PostsResponseData = {
    results: number;
    nextCursor: string | null;
    posts: PostDbModel[]
}
export type PostCommentsResponseData = {
    results: number;
    comments: CommentDbModel[]
}
export type LikeResponseData={
    isLiked:boolean
}
export type SaveResponseData={
    isSaved:boolean
}
export type SinglePostResponseData = {
    post: PostDbModel
}
export type SingleCommentResponseData = {
    comment: CommentDbModel
}

export type ApiError={
    field?:string;
    message:string
}
export type ApiResponse<T> = {
    status: ApiStatus;
    data: T ;
    message: string;
    errors:ApiError[] | null
};


export type UserResponse=ApiResponse<UserResponseData|null>
export type PostsResponse = ApiResponse<PostsResponseData | null>
export type ProductsResponse = ApiResponse<ProductsResponseData | null>
export type PostCommentsResponse = ApiResponse<PostCommentsResponseData | null>
export type SinglePostResponse = ApiResponse<SinglePostResponseData | null>
export type SingleCommentResponse = ApiResponse<SingleCommentResponseData | null>
export type LikeResponse = ApiResponse<LikeResponseData | null>
export type SaveResponse = ApiResponse<SaveResponseData | null>
export type SendVerificationResponse=ApiResponse<null|UserResponseData>
export type VerificationResponse=ApiResponse<null |UserResponseData>

export type verifyTokenCredientials = {
    token:string;
    endpoint:string
}
export type sendVerificationTokenCredientials = {
    identifier:string;
    endpoint:string
}
export type resetPasswordCredentials = {
    identifier:string;
    password:string;
    passwordConfirm:string;
}
export type onboardingCredientials={
    endpoint:"user"|"restaurant",
    data:FormData
}

export type editProfileCredientials ={
    endpoint:"user"|"restaurant"
    data:FormData
}
export type editAccountCredientials={
    userName:string
    email:string
    newPassword:string
    newPasswordConfirm:string
    currentPassword:string
}


export type deactivateAccountCredentials = {
    endpoint: "user" | "restaurant"
}
export type editPostCredientials ={
    postData:FormData
    id:string
}
export type getPostsCredentials = { cursor?: string; limit?: number }
export type toggleLikeCredentials={
    postId:string
}
export type togglesSaveCredentials={
    postId:string
}

export type createCommnetCredentials={
    postId:string
    text:string
}
export type getPostCommnetsCredentials={
    postId:string
}

export type getUserProfileCredentials={
    userId:string
    // profileType:"USER"|"RESTAURANT"
}
export type getOtherUserPostsCredentials={
    userId:string
    // profileType:"USER"|"RESTAURANT"
}
export type getProductsCredentials ={
    category?: string;
    sortBy?: 'price' | 'random' | 'preparationTime';
    cursor?: string;
}