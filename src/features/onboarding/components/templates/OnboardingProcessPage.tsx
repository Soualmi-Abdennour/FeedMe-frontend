"use client"
import VerificationProcess from '@/components/organism/VerificationProcess'
import { setUser } from '@/features/user/store/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { useEffect } from 'react'
import { SUBMIT_ONBOARDING_MESSAGES } from '../../constants/submitOnboarding.constants'
import { useOnboardMutation } from '../../store/onboarding.api.slice'
import SelectOnboardingRole from '../molecules/SelectOnboardingRole'
import NormalUserOnboardingProcess from '../organism/NormalUserOnboardingProcess'
import RestaurantUserOnboardingProcess from '../organism/RestaurantUserOnboardingProcess'


function OnboardingProcessPage() {
    const [onboard, { data, isLoading }] = useOnboardMutation()
    const { onboarding } = useAppSelector(state => state.onboarding)
    const { step, onboardingType } = onboarding
    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        const {status,message,data:responseData} = await onboard({
            role: onboarding.onboardingType!,
            profile: onboarding.profile!
        }).unwrap()
        if (status==="SUCCESS")
            dispatch(setUser(responseData?.user!))
    }
    useEffect(() => {
        ((step === 3 && onboardingType === "USER") || (step === 5 && onboardingType === "RESTAURANT")) && handleSubmit()
    }, [step, onboardingType])

    if (onboardingType === null || step === 0)
        return <SelectOnboardingRole></SelectOnboardingRole>
    if ((onboardingType === "RESTAURANT" && step === 5) || (onboardingType === "USER" && step === 3)) {
        return <VerificationProcess verificationMessages={SUBMIT_ONBOARDING_MESSAGES} queryProps={{ data, isLoading, queryFn: handleSubmit }}></VerificationProcess>
    }
    return (
        <div>
            {onboarding.onboardingType === "USER" ? (
                <NormalUserOnboardingProcess></NormalUserOnboardingProcess>
            ) : (
                <RestaurantUserOnboardingProcess></RestaurantUserOnboardingProcess>
            )}
        </div>
    )
}

export default OnboardingProcessPage
