import { NormalUserProfile, RestaurantUserProfile } from "@/features/user/types/user.types";
import { fetchAPI } from "@/store/base.store";
import { onboardingCredientials, UserResponse } from "@/types/api.types";






export const onboardingApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        onboard: build.mutation<UserResponse, onboardingCredientials>({
            query:(onboardingCredientials)=>({
                url:"/authentication/onboarding",
                method:"PATCH",
                body: onboardingCredientials
            })
        })
})
})

export const {useOnboardMutation} =onboardingApiSlice