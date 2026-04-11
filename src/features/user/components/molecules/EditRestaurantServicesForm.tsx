"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import { Button } from '@/components/ui/button'
import { RESTAURANT_SERVICES } from '@/constants/app.constants'
import { RestaurantUserProfileAppModel } from '@/features/user/types/user.types'
import { cn } from '@/utils/shadcn.utils'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import React, { useState } from 'react'
import { IRestaurantWorkingDaysFormOutput } from '../../schema/restaurantUserEditProfile.schema'
import { useUpdateProfileMutation } from '../../store/user.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { mapUserDbToAppModel } from '../../utils/user.utils'
import { setUser } from '../../store/user.slice'
import {RefreshCcw} from 'lucide-react'


function EditRestaurantServicesForm({defaultValues}:{defaultValues:RestaurantUserProfileAppModel["restaurantServices"]}) {
    const dispatch = useAppDispatch()
    const [updateProfile]=useUpdateProfileMutation()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    
    const [restaurantServices, setRestaurantServices] = useState<RestaurantUserProfileAppModel["restaurantServices"]>(defaultValues)
    
    function areObjectsEqual<T extends Record<string, any>>(obj1: T, obj2: T): boolean {
        for (const key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false; 
            }
        }
        return true;
    }
    const onSubmit = async () => {
        console.log({profile: {
            restaurantServices
        }});
        
        const fetchResponse = await updateProfile({
            endpoint: "restaurant",
            profile: {
                restaurantServices
            }
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        if (error) {
            console.log(error);

            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.message)
            }
        }
        else {
            const successResponseData = successResponse.data
            console.log(successResponseData);
            
            toast.success(successResponse.message)            
            dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
        }
    }
    return (
        <div className='flex flex-col bg-white w-[1000px] m-auto gap-7 p-3 rounded-lg shadow-black-500 shadow-lg'>
            <div className='flex justify-between items-center mb-7 mx-7'>
                <h3 className='text-xl'>Restaurant Services</h3>
                <Button
                className='text-white font-bold'
                    onClick={() => {
                        setRestaurantServices(defaultValues)
                        setEnableEdit(state => !state)
                    }}
                >{enableEdit ? "Cancel" : "Edit"}</Button>
            </div>            
            <div className='flex flex-col  gap-5 mx-10'>
                {RESTAURANT_SERVICES.map((service) => (
                    <div className='flex items-center justify-between' key={service.key}>
                        <h1 className='flex-1 pl-5 text-xl font-medium'>{service.value}</h1>
                        <div className='flex gap-5'>
                            {[...Array.from(["YES", "NO"])].map((item) => (
                                <Button
                                    variant='primary'
                                    key={item}
                                    disabled={!enableEdit}
                                    className={cn(restaurantServices[service.key] === item ? "bg-primary-500 text-white font-bold border border-primary-500" : "text-black font-bold bg-secondary-500 border border-primary-500 hover:text-white")}
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
            {enableEdit && (
                <div className='flex gap-2 text-white font-bold'>
                    <SubmitButton
                        className=""
                        onClick={onSubmit}
                        disabled={areObjectsEqual(defaultValues,restaurantServices)}
                    >
                        update
                    </SubmitButton>
                    <Button
                        disabled={areObjectsEqual(defaultValues,restaurantServices)}
                        onClick={() => setRestaurantServices(defaultValues)}
                    >
                        Reset
                        <RefreshCcw></RefreshCcw>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default EditRestaurantServicesForm
