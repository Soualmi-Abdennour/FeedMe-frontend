import { OnboardingStepPayloadModel } from "@/features/onboarding/types/onboarding.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { OnboardingStateModel } from "../types/onboarding.types";
import { NormalUserProfileAppModel, RestaurantUserProfileAppModel, UserRole } from "@/features/user/types/user.types";


export interface IOnboardingState {
    onboarding: OnboardingStateModel | null
}


const initialState: IOnboardingState = {
    onboarding:null
}


const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        setStep: (state: IOnboardingState, action: PayloadAction<OnboardingStepPayloadModel>) => {
            const { step, onboardingType, values,isOnboardingCompleted,avatarImageFile } = action.payload
            if(!state.onboarding){
                state.onboarding = {
                    step: 0,
                    isOnboardingCompleted:false,
                    onboardingType: "GUEST",
                    profile: null,
                }
            }
            state.onboarding.step = step
            if(isOnboardingCompleted){
                state.onboarding.isOnboardingCompleted=isOnboardingCompleted
            }
            if (onboardingType) {
                state.onboarding.onboardingType = onboardingType
            }
            if (avatarImageFile){
                state.onboarding.avatarImageFile=avatarImageFile
            }
            if (state.onboarding.onboardingType === "USER") {
                state.onboarding.profile = {
                    ...state.onboarding.profile,
                    ...(values as Partial<NormalUserProfileAppModel>)
                } as NormalUserProfileAppModel
            }
            if (state.onboarding.onboardingType === "RESTAURANT") {
                state.onboarding.profile = {
                    ...state.onboarding.profile,
                    ...(values as Partial<RestaurantUserProfileAppModel>)
                } as RestaurantUserProfileAppModel
            }
        },

        clearOnboarding: (state: IOnboardingState) => {
            state.onboarding = null
        }
    }
})

export const { setStep, clearOnboarding } = onboardingSlice.actions
export default onboardingSlice.reducer