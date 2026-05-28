"use client"

import { Button } from '@/components/ui/button'
import { RestaurantUserProfileAppModel } from '@/features/user/types/user.types'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { RESTAURANT_USER_ONBOARDING_FORM_FIELDS } from '../../constants/restauratnUserOnboarding.constants'
import { restaurantOnboardingFormSchema } from '../../schema/restaurantUserOnboarding.schema'
import { setStep } from '../../store/onboarding.slice'
import InformationForm from '../molecules/InformationForm'
import RestaurantSelectForm from '../organism/RestaurantSelectForm'
import RestaurantServicesForm from '../organism/RestaurantServicesForm'
import InformationFormWithImageUploader from '../molecules/InformationFormWithImageUploader'


function RestaurantUserOnboardingProcess() {
    const dispatch = useAppDispatch()
    const { onboarding } = useAppSelector(state => state.onboarding)
    const { restaurantBasicInformation, restaurantLocationAndContact } = onboarding?.profile as RestaurantUserProfileAppModel
    const defaultRestaurantBasicInformation = restaurantBasicInformation ? restaurantBasicInformation : {
        restaurantName: "",
        phoneNumber: "",
        businessEmail: ""
    } as RestaurantUserProfileAppModel["restaurantBasicInformation"]
    const defaultRestaurantLocationAndContact = restaurantLocationAndContact ? restaurantLocationAndContact : {
        googleMapsLink: "",
        postalCode: "",
        street: "",
        city: "Sidi Bel Abbès"

    } as RestaurantUserProfileAppModel["restaurantLocationAndContact"]


    const currentStepComponent = (): { stepTitle: string, component: React.ReactNode } => {
        if (onboarding?.step === 1)
            return {
                stepTitle: "Restaurant Basic Information",
                component: (
                    <InformationFormWithImageUploader
                        key={"step-1"}
                        formFields={RESTAURANT_USER_ONBOARDING_FORM_FIELDS.slice(0, 3)}
                        defaultValues={defaultRestaurantBasicInformation}
                        validationSchema={restaurantOnboardingFormSchema.pick({
                            restaurantName: true,
                            phoneNumber: true,
                            businessEmail: true
                        })}
                        defaultAvatarImageFile={onboarding.avatarImageFile}
                        stepMetadata={{
                            step: 2,
                            correspondProfileField: "restaurantBasicInformation"
                        }}
                    ></InformationFormWithImageUploader>
                )
            }
        if (onboarding?.step === 2)
            return {
                stepTitle: "Location and Contact",
                component: (
                    <InformationForm
                        key={"step-2"}
                        formFields={RESTAURANT_USER_ONBOARDING_FORM_FIELDS.slice(3)}
                        defaultValues={defaultRestaurantLocationAndContact}
                        validationSchema={restaurantOnboardingFormSchema.pick({
                            postalCode: true,
                            street: true,
                            googleMapsLink: true,
                            city: true
                        })}
                        stepMetadata={{
                            step: 3,
                            correspondProfileField: "restaurantLocationAndContact"
                        }}
                    ></InformationForm>
                )
            }
        if (onboarding?.step === 3)
            return {
                stepTitle: "Restaurant Usage Prefrences",
                component: (<RestaurantSelectForm></RestaurantSelectForm>)
            }
        if (onboarding?.step === 4)
            return {
                stepTitle: "Restaurant Services",
                component: (<RestaurantServicesForm></RestaurantServicesForm>)
            }
        return {
            stepTitle: "",
            component: null
        }
    }
    const { stepTitle, component } = currentStepComponent()
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
            <div className="text-center justify-center pb-10 mx-auto min-w-[320px]">
                <h4 className='pb-5'>{stepTitle}</h4>
                {component}
            </div>
        </div>
    )
}

export default RestaurantUserOnboardingProcess
