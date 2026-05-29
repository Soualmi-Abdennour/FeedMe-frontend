import React from 'react'
import { setUser } from '@/features/user/store/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { onboardingCredientials, UserResponse } from '@/types/api.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useCallback } from 'react'
import { useOnboardMutation } from '../../store/onboarding.api.slice'
import { clearOnboarding } from '../../store/onboarding.slice'
import VerificationProcess from '@/components/organism/VerificationProcess'
import { SUBMIT_ONBOARDING_MESSAGES } from '../../constants/submitOnboarding.constants'
import { useRouter } from 'next/navigation'
import { mapUserDbToAppModel } from '@/features/user/utils/user.utils'
import { buildOnboardingFormData } from '../../utils/onboarding.utils'

function SubmitOnboardingProcess() {
    const [onboard] = useOnboardMutation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { onboarding } = useAppSelector(state => state.onboarding)
    
    const handleSubmit = useCallback(async (): Promise<UserResponse>  => {
        const endpoint: onboardingCredientials["endpoint"] = onboarding?.onboardingType === "USER" ? "user" : "restaurant"
        const {onboardingType,profile,avatarImageFile } = onboarding!
        const formData = buildOnboardingFormData({
            onboardingType,profile,avatarImageFile
        })
        const fetchResponse = await onboard({
            endpoint,
            data:formData
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        const errorResponse: UserResponse = error?.data as UserResponse
        
        return successResponse ?? errorResponse
    }, [onboard, onboarding?.isOnboardingCompleted, dispatch])

    const onSuccessFn = (successResponse: UserResponse) => {
        const successResponseData = successResponse.data
        router.replace(`/publication`)
        dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
        setTimeout(() => {
            dispatch(clearOnboarding())            
        }, 2000);
    }
    const onFailFn = () => {
        router.replace("/sign-in")
    }
    return (
        <VerificationProcess
            verificationMessages={SUBMIT_ONBOARDING_MESSAGES}
            queryFn={handleSubmit}
            onSuccessFn={onSuccessFn}
            onErrorFn={handleSubmit}
            onFailFn={onFailFn}></VerificationProcess>
    )
}

export default SubmitOnboardingProcess
