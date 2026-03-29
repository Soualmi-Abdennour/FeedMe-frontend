"use client"
import { useAppSelector } from '@/store/base.store'
import SelectOnboardingRole from '../molecules/SelectOnboardingRole'
import SubmitOnboardingProcess from '../organism/SubmitOnboardingProcess'
import NormalUserOnboardingProcess from './NormalUserOnboardingProcess'
import RestaurantUserOnboardingProcess from './RestaurantUserOnboardingProcess'


function OnboardingProcessPage() {
    const { onboarding } = useAppSelector(state => state.onboarding)
    if (!onboarding || onboarding.onboardingType==="GUEST" || onboarding?.step === 0)
        return <SelectOnboardingRole></SelectOnboardingRole>
    if (onboarding?.isOnboardingCompleted) {                
        return <SubmitOnboardingProcess></SubmitOnboardingProcess>
    }

    return (
        <div>
            {onboarding?.onboardingType === "USER" ? (
                <NormalUserOnboardingProcess></NormalUserOnboardingProcess>
            ) : (
                <RestaurantUserOnboardingProcess></RestaurantUserOnboardingProcess>
            )}
        </div>
    )
}


export default OnboardingProcessPage
