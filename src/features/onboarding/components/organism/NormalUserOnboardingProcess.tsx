"use client"

import { Button } from '@/components/ui/button'
import { NormalUserProfile } from '@/features/user/types/user.types'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import React from 'react'
import { NORMAL_USER_ONBOARDING_FORM_FIELDS } from '../../constants/normalUserOnboarding.constants'
import { normalUserOnboardingFormSchema } from '../../schema/normalUserOnboarding.schema'
import { setStep } from '../../store/onboarding.slice'
import InformationForm from '../molecules/InformationForm'
import UserSelectForm from '../molecules/UserSelectForm'


function NormalUserOnboardingProcess() {
    const { onboarding } = useAppSelector(state => state.onboarding)
    const dispatch=useAppDispatch()
    const {step}=onboarding
    const { userBasicInformation } = onboarding.profile as NormalUserProfile
    const defaultUserBasicInformation = userBasicInformation ? userBasicInformation : {
        fullName: "",
        phoneNumber: "",
        profileImageUrl:"",
        bio:"",
        // city:""
    } as NormalUserProfile["userBasicInformation"]


    const currentStepComponent = (): React.ReactNode => {
        if (step === 1)
            return (<InformationForm
                formFields={NORMAL_USER_ONBOARDING_FORM_FIELDS}
                defaultValues={defaultUserBasicInformation}
                validationSchema={normalUserOnboardingFormSchema}
                stepMetadata={{
                    step: 2,
                    correspondProfileField: "userBasicInformation"
                }}
            ></InformationForm>)
        if (step === 2)
            return <UserSelectForm></UserSelectForm>
    }


    return (
        <div className=''>
            <Button
                onClick={() => {
                    dispatch(setStep({
                        step: step - 1,
                        values: {}
                    }))
                }}
            >
                back
            </Button>
            {currentStepComponent()}
        </div>
    )
}

export default NormalUserOnboardingProcess
