import { MediaAppModel } from "@/features/studio-and-publication/types/media.types"
import { NormalUserProfileAppModel, ProfileImage, RestaurantUserProfileAppModel, UserRole } from "@/features/user/types/user.types"

export type ProfileByRole = {
    GUEST:null,
    USER: NormalUserProfileAppModel
    RESTAURANT: RestaurantUserProfileAppModel
    ADMIN:null
}

export type OnboardingStateModel ={
    step:number
    isOnboardingCompleted:boolean
    onboardingType: UserRole
    profile: ProfileByRole[UserRole],
    avatarImageFile?: File
}
export type OnboardingStepPayloadModel={
    step:number;
    isOnboardingCompleted?: boolean;
    onboardingType?:UserRole | null
    values: Partial<NormalUserProfileAppModel> | Partial<RestaurantUserProfileAppModel>
    avatarImageFile?: File | null
}

export type OnboardingFormData ={
    onboardingType: UserRole
    profile: ProfileByRole[UserRole],
    avatarImageFile?: File
}