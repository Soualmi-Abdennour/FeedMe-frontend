import { UserAppModel } from "@/features/user/types/user.types";


export type authStateModel=Pick<UserAppModel,"email"|"userName">&{
    jwt_token:string;
    isAuth:boolean;
    sessionID?:string;
    sessionExpireDate?:Date;
    isSessionExpired?:boolean
}