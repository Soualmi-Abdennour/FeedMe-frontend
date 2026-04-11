import FormField from '@/components/molecules/FormField'
import { WeekDay, WorkingDay } from '@/types/app.types'
import { IWorkingDayFormField } from '@/types/props.types'
import { cn } from '@/utils/shadcn.utils'
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'

type Props=IWorkingDayFormField & {
    onClick:()=>void,
    isSelected:boolean
}

function WorkingDayField({ disabled=false,day, from, to, errors, control, onClick,isSelected}:Props) {    
    return (
        <div>
        <div className={cn('flex justify-between items-center border rounded-lg p-2 cursor-pointer',isSelected && !disabled && " border-2 border-primary")}>
            <h3 className={cn('flex-1 text-xl cursor-pointer mr-3 font-medium')} >{day}</h3>
            {isSelected &&(
                    <div className='flex gap-3'>
                        <FormField  {...from} errors={errors} control={control} disabled={!isSelected ||disabled}></FormField>
                        <FormField {...to} errors={errors} control={control} disabled={!isSelected || disabled}></FormField>
                    </div>
            )}
            {
                !disabled && (
                        <Button onClick={onClick}
                        className='text-white font-bold text-xs'
                        type='button'>
                            {isSelected ? "Unselect" : "Select"}
                        </Button>
                )
            }
        </div>
            <p className={`mt-4 text-left text-sm ${errors[day] ? "text-red-500" : ""}`}>
                {errors[day] && errors[day].message ||errors[day]?.root?.message}
            </p>
        </div>
    )
}

export default WorkingDayField
