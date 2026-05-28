import { fetchAPI } from "@/store/base.store";
import { onboardingCredientials, UserResponse } from "@/types/api.types";






export const onboardingApiSlice=fetchAPI.injectEndpoints({
    endpoints:(build)=>({
        onboard: build.mutation<UserResponse, onboardingCredientials>({
            query:({endpoint,data})=>({
                url: `/authentication/onboarding/${endpoint}`,
                method:"PATCH",
                body: data
            })
        })
})
})

export const {useOnboardMutation} =onboardingApiSlice