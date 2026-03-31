import { OnboardingStepPayloadModel } from "@/features/onboarding/types/onboarding.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { OnboardingStateModel } from "../types/onboarding.types";
import { NormalUserProfile, RestaurantUserProfile, UserRole } from "@/features/user/types/user.types";


export interface IOnboardingState {
    onboarding: OnboardingStateModel
}


const initialState: IOnboardingState = {
    onboarding: {
        step: 0,
        onboardingType: null,
        profile: null,
    }
}


const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        setStep: (state: IOnboardingState, action: PayloadAction<OnboardingStepPayloadModel>) => {
            const { step, onboardingType, values } = action.payload

            state.onboarding.step = step

            if (onboardingType) {
                state.onboarding.onboardingType = onboardingType
            }
            if (state.onboarding.onboardingType === "USER") {
                state.onboarding.profile = {
                    ...state.onboarding.profile,
                    ...(values as Partial<NormalUserProfile>)
                } as NormalUserProfile
            }
            if (state.onboarding.onboardingType === "RESTAURANT") {
                state.onboarding.profile = {
                    ...state.onboarding.profile,
                    ...(values as Partial<RestaurantUserProfile>)
                } as RestaurantUserProfile
            }
        },

        clearOnboarding: (state: IOnboardingState) => {
            state.onboarding = {
                step: 0,
                onboardingType: null,
                profile: null
            }
        }
    }
})

export const { setStep, clearOnboarding } = onboardingSlice.actions
export default onboardingSlice.reducer