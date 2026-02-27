import { UserAppModel, UserDbModel } from "../types/user.types"

export const mapUserDbModelToAppModel=(user:UserDbModel):UserAppModel=>{
    console.log(user);
    
    return {
        userName:user.userName,
        active:user.active,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
        role:user.role,
        email:user.email,
        isVerified:user.isVerified}
}