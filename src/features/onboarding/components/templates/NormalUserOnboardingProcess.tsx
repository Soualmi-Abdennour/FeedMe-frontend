"use client"

import { Button } from '@/components/ui/button'
import { NormalUserProfileAppModel } from '@/features/user/types/user.types'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import React from 'react'
import { NORMAL_USER_ONBOARDING_FORM_FIELDS } from '../../constants/normalUserOnboarding.constants'
import { normalUserOnboardingFormSchema } from '../../schema/normalUserOnboarding.schema'
import { setStep } from '../../store/onboarding.slice'
import InformationForm from '../molecules/InformationForm'
import UserSelectForm from '../organism/UserSelectForm'


function NormalUserOnboardingProcess() {
    const { onboarding } = useAppSelector(state => state.onboarding)
    const dispatch=useAppDispatch()
    const { userBasicInformation } = onboarding?.profile as NormalUserProfileAppModel
    const defaultUserBasicInformation = userBasicInformation ? userBasicInformation : {
        fullName: "",
        phoneNumber: "",
        profileImageUrl:"",
        bio:"",
        // city:""
    } as NormalUserProfileAppModel["userBasicInformation"]


    const currentStepComponent = (): React.ReactNode => {
        if (onboarding?.step === 1)
            return (<InformationForm
                formFields={NORMAL_USER_ONBOARDING_FORM_FIELDS}
                defaultValues={defaultUserBasicInformation}
                validationSchema={normalUserOnboardingFormSchema}
                stepMetadata={{
                    step: 2,
                    correspondProfileField: "userBasicInformation"
                }}
            ></InformationForm>)
        if (onboarding?.step === 2)
            return <UserSelectForm></UserSelectForm>
    }


    return (
        <div className=''>
            <Button
                onClick={() => {
                    dispatch(setStep({
                        step: onboarding?.step! - 1,
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
