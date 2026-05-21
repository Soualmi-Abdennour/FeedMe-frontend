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
import { LucideAArrowDown, LucideSquareArrowLeft, ArrowLeft } from 'lucide-react'


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
            return (<div className='flex flex-col'>
                <div className='bg-primary-300 rounded-full size-[70px] mx-auto my-5'></div>
            <InformationForm
                formFields={NORMAL_USER_ONBOARDING_FORM_FIELDS}
                defaultValues={defaultUserBasicInformation}
                validationSchema={normalUserOnboardingFormSchema}
                stepMetadata={{
                    step: 2,
                    correspondProfileField: "userBasicInformation"
                }}
            ></InformationForm>
            </div>
            )
        if (onboarding?.step === 2)
            return(
                <div className='flex'>
                    <UserSelectForm></UserSelectForm>
                </div>
            ) 
    }


    return (
        <div>
            <Button
            variant='ghost'
            className='absolute z-10 left-0 top-0 size-[100px] text-neutral-800 font-bold'
                onClick={() => {
                    dispatch(setStep({
                        step: onboarding?.step! - 1,
                        values: {}
                    }))
                }}
            >
                <ArrowLeft size={100}></ArrowLeft>
            </Button>
            {currentStepComponent()}
        </div>
    )
}

export default NormalUserOnboardingProcess
