import { NormalUserProfile, RestaurantUserProfile, UserAppModel, UserRole } from "@/features/user/types/user.types";

export type ApiStatus = "SUCCESS" | "FAIL" | "ERROR";

export type UserResponseData={
    user:UserAppModel;
    jwtToken?:string
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
    role:UserRole,
    profile: NormalUserProfile | RestaurantUserProfile
}