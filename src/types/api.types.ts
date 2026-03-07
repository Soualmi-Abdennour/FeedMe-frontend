import { UserAppModel } from "@/features/user/types/user.types";

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
    data: T | null;
    message: string;
    errors:ApiError[] | null
};


export type UserResponse=ApiResponse<UserResponseData>