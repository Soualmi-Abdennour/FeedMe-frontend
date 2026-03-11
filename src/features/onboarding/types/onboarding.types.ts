import { NormalUserProfile, RestaurantUserProfile, UserRole } from "@/features/user/types/user.types"

export type ProfileByRole = {
    USER: NormalUserProfile
    RESTAURANT: RestaurantUserProfile
    ADMIN:null
}

export type OnboardingStateModel ={
    step:number
    onboardingType: UserRole| null
    profile: ProfileByRole[UserRole],
}
export type OnboardingStepPayloadModel={
    step:number;
    onboardingType?:UserRole | null
    values: Partial<NormalUserProfile> | Partial<RestaurantUserProfile>
}

