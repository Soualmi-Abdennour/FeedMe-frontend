import { RestaurantUserProfileAppModel } from '@/features/user/types/user.types'
import { useAppSelector } from '@/store/base.store'
import { WeekDay, WorkingDay } from '@/types/app.types'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IRestaurantWorkingDaysFormInput,IRestaurantWorkingDaysFormOutput,restaurantWorkingDaysFormSchema } from '../../schema/restaurantUserOnboarding.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { RESTAURANT_WORKING_DAYS_FORM } from '../../constants/restauratnUserOnboarding.constants'
import WorkingDayField from '../../../../components/molecules/WorkingDayField'
import SubmitButton from '@/components/atoms/SubmitButton'
import { WEEK_DAYS } from '@/constants/app.constants'
import { toggleValue } from '@/utils/state.utils'

interface Props { 
    selectedDays:WeekDay[];
    defaultValues:WorkingDay[];
    setSelectedDays:Dispatch<SetStateAction<WeekDay[]>>;
    onSubmit:(formData:any)=>void;
    allowSubmit:boolean
}

function WorkingDaysForm({onSubmit,selectedDays,setSelectedDays,allowSubmit,defaultValues}: Props) {
    const transformDefaultValues = (): IRestaurantWorkingDaysFormInput =>{
        return Object.fromEntries(
            defaultValues.map(({ day, from, to }) => [day,{from,to}])
        ) as IRestaurantWorkingDaysFormInput
    }

    
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        unregister,
        formState: { errors,isSubmitting }
    } = useForm<IRestaurantWorkingDaysFormInput,any,IRestaurantWorkingDaysFormOutput>({
        resolver: zodResolver(restaurantWorkingDaysFormSchema),
        mode: "onChange",
        defaultValues:transformDefaultValues()
})
const toggleFieldDefaultValue=(day:WeekDay)=>{
    const currentValue=getValues(day)
    if(!currentValue){
        setValue(day, { from: "", to: "" })
    }
    else {
        unregister(day)
    }
}
    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid-cols-2 grid gap-3 items-center'>
            {RESTAURANT_WORKING_DAYS_FORM.map((dayField)=>(
                <div key={dayField.day}>
                    <WorkingDayField  
                        {...dayField} 
                        control={control} 
                        errors={errors}
                        isSelected={selectedDays.includes(dayField.day)}
                        onClick={()=>{
                            toggleFieldDefaultValue(dayField.day)
                            toggleValue(dayField.day,setSelectedDays)
                        }
                        }
                    ></WorkingDayField>
                </div>
            ))}
            </div>
            <SubmitButton
                className="mt-10 w-full"
                disabled={!allowSubmit || isSubmitting}
            >
                {/* {selectionCount > 1 ? "Continue" : "Skip"} */} continure
            </SubmitButton>
        </form>
    )
}

export default WorkingDaysForm
