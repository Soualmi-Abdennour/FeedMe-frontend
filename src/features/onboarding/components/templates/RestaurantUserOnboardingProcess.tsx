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
            return (<InformationForm
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
            ></InformationForm>)
        if (onboarding?.step === 2)
            return (<InformationForm
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
            ></InformationForm>)
        if (onboarding?.step === 3)
            return <RestaurantSelectForm></RestaurantSelectForm>
        if (onboarding?.step === 4)
            return <RestaurantServicesForm></RestaurantServicesForm>
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

export default RestaurantUserOnboardingProcess
