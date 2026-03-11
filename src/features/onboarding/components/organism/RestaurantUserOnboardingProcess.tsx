"use client"

import { Button } from '@/components/ui/button'
import { setUser } from '@/features/user/store/user.slice'
import { RestaurantUserProfile } from '@/features/user/types/user.types'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import React from 'react'
import { RESTAURANT_USER_ONBOARDING_FORM_FIELDS } from '../../constants/restauratnUserOnboarding.constants'
import { restaurantOnboardingFormSchema } from '../../schema/restaurantUserOnboarding.schema'
import { useOnboardMutation } from '../../store/onboarding.api.slice'
import { setStep } from '../../store/onboarding.slice'
import InformationForm from '../molecules/InformationForm'
import RestaurantSelectForm from '../molecules/RestaurantSelectForm'
import RestaurantServicesForm from '../molecules/RestaurantServicesForm'


function RestaurantUserOnboardingProcess() {
    const { onboarding: { step } } = useAppSelector(state => state.onboarding)
    // const [onboard, { data, isLoading }] = useOnboardMutation()
    const dispatch = useAppDispatch()
    const { onboarding } = useAppSelector(state => state.onboarding)
    console.log(onboarding);


    const { restaurantBasicInformation, restaurantLocationAndContact } = onboarding.profile as RestaurantUserProfile
    const defaultRestaurantBasicInformation = restaurantBasicInformation ? restaurantBasicInformation : {
        restaurantName: "",
        phoneNumber: "",
        businessEmail: ""
    } as RestaurantUserProfile["restaurantBasicInformation"]
    const defaultRestaurantLocationAndContact = restaurantLocationAndContact ? restaurantLocationAndContact : {
        googleMapsLink: "",
        postalCode: "",
        street: "",
        city: "Sidi Bel Abbès"

    } as RestaurantUserProfile["restaurantLocationAndContact"]

    // const handleSubmit = async () => {
    //     const response = await onboard({
    //         role: onboarding.onboardingType!,
    //         profile: onboarding.profile!
    //     }).unwrap()
    //     if (response.data?.user)
    //         dispatch(setUser(response.data?.user))
    // }
    const currentStepComponent = (): React.ReactNode => {
        if (step === 1)
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
        if (step === 2)
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
        if (step === 3)
            return <RestaurantSelectForm></RestaurantSelectForm>
        if (step === 4)
            return <RestaurantServicesForm></RestaurantServicesForm>
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

export default RestaurantUserOnboardingProcess
