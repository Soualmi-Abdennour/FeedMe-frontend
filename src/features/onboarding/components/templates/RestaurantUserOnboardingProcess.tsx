"use client"

import { Button } from '@/components/ui/button'
import { setUser } from '@/features/user/store/user.slice'
import { RestaurantUserProfileAppModel } from '@/features/user/types/user.types'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import React from 'react'
import { RESTAURANT_USER_ONBOARDING_FORM_FIELDS } from '../../constants/restauratnUserOnboarding.constants'
import { restaurantOnboardingFormSchema } from '../../schema/restaurantUserOnboarding.schema'
import { useOnboardMutation } from '../../store/onboarding.api.slice'
import { setStep } from '../../store/onboarding.slice'
import InformationForm from '../molecules/InformationForm'
import RestaurantSelectForm from '../organism/RestaurantSelectForm'
import RestaurantServicesForm from '../organism/RestaurantServicesForm'
import { ArrowLeft } from 'lucide-react'


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

    const currentStepComponent = (): React.ReactNode => {
        if (onboarding?.step === 1)
            return (
                <div className='flex  flex-col'>
                    <div className='relative'>
            <Button
            variant="ghost"
            className='absolute top-[-70px] left-[-80px] size-[70px] text-neutral-800 font-bold'
                onClick={() => {
                    dispatch(setStep({
                        step: onboarding?.step! - 1,
                        values: {}
                    }))
                }}
            >
                <ArrowLeft></ArrowLeft>
            </Button>
        </div>
                <div className='bg-primary-300 rounded-full size-[70px] mx-auto my-5'></div>
                <InformationForm
                key={"step-1"}
                formFields={RESTAURANT_USER_ONBOARDING_FORM_FIELDS.slice(0, 3)}
                defaultValues={defaultRestaurantBasicInformation}
                validationSchema={restaurantOnboardingFormSchema.pick({
                    restaurantName: true,
                    phoneNumber: true,
                    businessEmail: true
                })}
                stepMetadata={{
                    step: 2,
                    correspondProfileField: "restaurantBasicInformation"
                }}
            ></InformationForm>
            
            </div>
            )
        if (onboarding?.step === 2)
            return (
                <div className='relative'>
                <Button
                variant="ghost"
                className='absolute top-[-70px] left-[-80px] size-[70px] text-neutral-800 font-bold'
                    onClick={() => {
                        dispatch(setStep({
                            step: onboarding?.step! - 1,
                            values: {}
                        }))
                    }}
                >
                    <ArrowLeft></ArrowLeft>
                </Button>
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
            </div>
            )
        if (onboarding?.step === 3)
            return (
                <div className='relative'>
                <Button
                variant="ghost"
                className='absolute top-[-70px] left-[-70px] size-[70px] text-neutral-800 font-bold'
                    onClick={() => {
                        dispatch(setStep({
                            step: onboarding?.step! - 1,
                            values: {}
                        }))
                    }}
                >
                    <ArrowLeft></ArrowLeft>
                </Button>
                <RestaurantSelectForm></RestaurantSelectForm>
            </div>
            )
        if (onboarding?.step === 4)
            return (
                <div className='relative'>
                <Button
                variant="ghost"
                className='absolute top-[-100px] left-[-70px] size-[70px] text-neutral-800 font-bold'
                    onClick={() => {
                        dispatch(setStep({
                            step: onboarding?.step! - 1,
                            values: {}
                        }))
                    }}
                >
                    <ArrowLeft></ArrowLeft>
                </Button>
                <RestaurantServicesForm></RestaurantServicesForm>
            </div>
            )
    }

    return (
        currentStepComponent()
    )
}

export default RestaurantUserOnboardingProcess
