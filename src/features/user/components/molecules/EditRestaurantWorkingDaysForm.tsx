import { RestaurantUserProfileAppModel } from '@/features/user/types/user.types'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { TimeString, WeekDay, WorkingDay } from '@/types/app.types'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IRestaurantWorkingDaysFormInput, IRestaurantWorkingDaysFormOutput, restaurantWorkingDaysFormSchema } from '../../schema/restaurantUserEditProfile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { EDIT_RESTAURANT_USER_WORKING_DAYS_FORM } from '../../constants/restaurantUserEditProfile.constants'
import WorkingDayField from '../../../../components/molecules/WorkingDayField'
import SubmitButton from '@/components/atoms/SubmitButton'
import { WEEK_DAYS } from '@/constants/app.constants'
import { toggleValue } from '@/utils/state.utils'
import { Button } from '@/components/ui/button'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { useUpdateProfileMutation } from '../../store/user.api.slice'
import { toast } from 'sonner'
import { mapUserDbToAppModel } from '../../utils/user.utils'
import { setUser } from '../../store/user.slice'

interface Props {
    defaultValues: WorkingDay[]
}

function EditRestaurantWorkingDaysForm({ defaultValues }: Props) {
    const profile = useAppSelector(state => state.user.user?.profile!) as RestaurantUserProfileAppModel
    const [updateProfile] = useUpdateProfileMutation()
    const dispatch = useAppDispatch()
    const shallowWorkingDays: WeekDay[] = defaultValues?.map((workingDay) => workingDay.day)
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    const [selectedDays, setSelectedDays] = useState<WeekDay[]>(shallowWorkingDays ?? [])
    const transformDefaultValues = (): IRestaurantWorkingDaysFormInput => {
        return Object.fromEntries(
            defaultValues.map(({ day, from, to }) => [day, { from, to }])
        ) as IRestaurantWorkingDaysFormInput
    }

    const {
        setValue,
        getValues,
        handleSubmit,
        control,
        reset,
        unregister,
        formState: { errors, isSubmitting, isValid }
    } = useForm<IRestaurantWorkingDaysFormInput, any, IRestaurantWorkingDaysFormOutput>({
        resolver: zodResolver(restaurantWorkingDaysFormSchema),
        mode: "onChange",
        // reValidateMode:"onChange",
        defaultValues: transformDefaultValues(),
        shouldUnregister: true
    })
    const renderFields = (): typeof EDIT_RESTAURANT_USER_WORKING_DAYS_FORM => {
        if (enableEdit)
            return EDIT_RESTAURANT_USER_WORKING_DAYS_FORM
        return EDIT_RESTAURANT_USER_WORKING_DAYS_FORM.filter(dayField => shallowWorkingDays.includes(dayField.day))
    }

    const toggleFieldDefaultValue = (day: WeekDay) => {
        const currentValue = getValues(day)
        if (!currentValue) {
            setValue(day, { from: "", to: "" })
        }
        else {
            unregister(day)
        }
    }
    const onSubmit = async (formData: IRestaurantWorkingDaysFormOutput) => {
        const fetchResponse = await updateProfile({
            endpoint: "restaurant",
            profile: {
                restaurantDetails: {
                    kitchenCategory: profile.restaurantDetails.kitchenCategory,
                    workingDays: formData
                }
            }
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        if (error) {
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
            toast.success(successResponse.message)
            dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
        }
    }
    return (
        <div className='p-3 rounded-lg border-2 border-primary'>
            <div className='flex justify-between '>
                <h3>Working Days</h3>
                <Button
                    onClick={() => {
                        setSelectedDays(shallowWorkingDays)
                        setEnableEdit(state => !state)
                    }}
                >{enableEdit ? "Cancel" : "Edit"}</Button>
            </div>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit((formData) => onSubmit(formData))}>
                <div className='flex flex-col gap-3'>
                    {renderFields().map((dayField) =>
                        <div key={dayField.day}>
                            <WorkingDayField
                                disabled={!enableEdit}
                                {...dayField}
                                control={control}
                                errors={errors}
                                isSelected={selectedDays.includes(dayField.day)}
                                onClick={() => {
                                    toggleFieldDefaultValue(dayField.day)
                                    toggleValue(dayField.day, setSelectedDays)
                                }
                                }
                            ></WorkingDayField>
                        </div>
                    )}
                </div>
                {enableEdit && (
                    <div className='flex gap-2'>
                        <SubmitButton
                            className=""
                            // disabled={!isValid || selectedDays.length === 0 || selectedDays.every(value => shallowWorkingDays.includes(value))}
                        >
                            update
                        </SubmitButton>
                        <Button
                            disabled={selectedDays.every(value => shallowWorkingDays.includes(value))}
                            onClick={() => setSelectedDays(shallowWorkingDays)}
                            type='button'
                        >
                            Reset
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditRestaurantWorkingDaysForm
function updateProfile(arg0: { endpoint: string; profile: { restaurantDetails: { kitchenCategory: { from: TimeString; to: TimeString; day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" }[]; workingDays: any } } }) {
    throw new Error('Function not implemented.')
}

