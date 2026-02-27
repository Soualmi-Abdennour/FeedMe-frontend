
export type UserRole="USER"|"RESTAURANT"|"ADMIN"

export type UserAppModel = {
    userName: string;
    email: string;
    role: UserRole;
    active: boolean;
    isVerified:boolean;
    createdAt:Date;
    updatedAt:Date;
}

export type UserDbModel=UserAppModel & {
    password: string;
    passwordChangedAt: Date;
    passwordResetToken:string;
    passwordResetExpires:Date;
    verificationToken:string;
}


