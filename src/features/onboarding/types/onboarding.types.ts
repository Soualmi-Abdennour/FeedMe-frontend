import { NormalUserProfileAppModel, RestaurantUserProfileAppModel, UserRole } from "@/features/user/types/user.types"

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
}
export type OnboardingStepPayloadModel={
    step:number;
    isOnboardingCompleted?: boolean;
    onboardingType?:UserRole | null
    values: Partial<NormalUserProfileAppModel> | Partial<RestaurantUserProfileAppModel>
}

