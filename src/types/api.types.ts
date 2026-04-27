import { PostAppModel, PostDbModel } from "@/features/studio-and-publication/types/studio.types";
import { NormalUserProfileAppModel, RestaurantUserProfileAppModel, UserDbModel, UserRole } from "@/features/user/types/user.types";

export type ApiStatus = "SUCCESS" | "FAIL" | "ERROR";

export type UserResponseData={
    user:UserDbModel;
    jwtToken?:string
}
export type PostResponseData = {
    posts: PostDbModel[]
}
export type SinglePostResponseData = {
    post: PostDbModel
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
export type PostResponse = ApiResponse<PostResponseData | null>
export type SinglePostResponse = ApiResponse<SinglePostResponseData | null>
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
    role:UserRole,
    profile: NormalUserProfileAppModel | RestaurantUserProfileAppModel
}

export type editProfileCredientials ={
    endpoint:"user"|"restaurant"
    profile: Partial<NormalUserProfileAppModel | RestaurantUserProfileAppModel>
}

export type editPostCredientials = {
    postData: FormData;
    id: string;
}