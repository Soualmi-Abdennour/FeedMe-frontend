"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import { Button } from '@/components/ui/button'
import { RESTAURANT_SERVICES } from '@/constants/app.constants'
import { RestaurantUserProfileAppModel } from '@/features/user/types/user.types'
import { cn } from '@/utils/shadcn.utils'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import React, { useState } from 'react'
import { setStep } from '../../store/onboarding.slice'


function RestaurantServicesForm() {
    const dispatch = useAppDispatch()
    const { onboarding } = useAppSelector(state => state.onboarding)
    const profile = onboarding?.profile as RestaurantUserProfileAppModel
    const [restaurantServices, setRestaurantServices] = useState<RestaurantUserProfileAppModel["restaurantServices"]>(profile?.restaurantServices ? profile.restaurantServices : {
        delivery: "NO",
        reservation: "NO",
        dineIn: "NO",
        takeAway: "NO",
        parkAvailability: "NO"

    })
    const handleSubmit = () => {
        dispatch(setStep({
            step: 5,
            isOnboardingCompleted: true,
            values: {
                restaurantServices
            }
        }))
    }
    return (
        <div>
            <h1>Restaurant services:</h1>
            <div className='flex flex-col  gap-10'>
                {RESTAURANT_SERVICES.map((service) => (
                    <div className='flex items-center justify-between' key={service.key}>
                        <h1 className='flex-1'>{service.value}</h1>
                        <div className='flex gap-5'>
                            {[...Array.from(["YES", "NO"])].map((item) => (
                                <Button
                                    key={item}
                                    className={cn(restaurantServices[service.key] === item ? "bg-primary text-white" : "text-black bg-secondary hover:text-white")}
                                    onClick={() => {
                                        setRestaurantServices(state => ({
                                            ...state,
                                            [service.key]: item
                                        }))
                                    }}
                                >{item}</Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <SubmitButton
                className='mt-20'
                onClick={handleSubmit}
            >
                Continue
            </SubmitButton>
        </div>
    )
}

export default RestaurantServicesForm
