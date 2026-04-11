"use client"
import { NormalUserProfileAppModel } from "@/features/user/types/user.types"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { KithcenCategory, UsageGoal, WorkingDay } from "@/types/app.types"
import { useState } from "react"
import SelectArea from "@/components/molecules/SelectArea"
import SubmitButton from "@/components/atoms/SubmitButton"
import { KITCHEN_CATEGORY, USAGE_GOAL } from "@/constants/app.constants"
import { Button } from "@/components/ui/button"
import { toggleValue } from "@/utils/state.utils"
import { IEditSelectFormProps } from "../../types/props.types"
import { useUpdateProfileMutation } from "../../store/user.api.slice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { UserResponse } from "@/types/api.types"
import { toast } from "sonner"
import { mapUserDbToAppModel } from "../../utils/user.utils"
import { setUser } from "../../store/user.slice"
import {RefreshCcw} from 'lucide-react'

function EditSelectForm<T>({
    sectionTitle,
    defaultValues,
    itemsList,
    fieldToUpdate,
    endpoint
}: IEditSelectFormProps<T>) {
    const dispatch = useAppDispatch()
    const [updateProfile] = useUpdateProfileMutation()

    const onSubmit = async (formData: T[]) => {
        console.log({
            profile: {
                [fieldToUpdate[0]]: {
                    [fieldToUpdate[1]]: formData
                }
            }
        });
        const fetchResponse = await updateProfile({
            endpoint,
            profile: {
                [fieldToUpdate[0]]: {
                    [fieldToUpdate[1]]: formData
                }
            }
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        if (error) {
            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR" ) {   
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
    const [selectedValues, setSelectedValues] = useState<T[]>(defaultValues)
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    return (
        <div className='flex flex-col bg-white w-[1000px] m-auto gap-3 p-3 rounded-lg shadow-black-500 shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className="text-xl">{sectionTitle}</h3>
                <Button
                className="text-white font-bold"
                variant='primary'
                    onClick={() => {
                        setSelectedValues(defaultValues)
                        setEnableEdit(state => !state)
                    }}
                >{enableEdit ? "Cancel" : "Edit"}</Button>
            </div>
            <div className="py-5 flex flex-col gap-10">
                <SelectArea
                    areaTitle={sectionTitle}
                    selectedItemsList={selectedValues}
                    itemsList={enableEdit ? itemsList : selectedValues}
                    handleSelect={(value) => {
                        if (enableEdit)
                            toggleValue(value, setSelectedValues)
                    }}
                ></SelectArea>
                {enableEdit && (
                    <div className='flex gap-2 text-white font-bold'>
                        <SubmitButton
                            className=""
                            onClick={() => onSubmit(selectedValues)}
                        // disabled={selectedValues.length === 0 || selectedValues.every(value => defaultValues.includes(value))}
                        >
                            update
                        </SubmitButton>
                        <Button
                            // disabled={selectedValues.every(value=>defaultValues.includes(value))}
                            onClick={() => setSelectedValues(defaultValues)}
                        >
                            Reset
                            <RefreshCcw></RefreshCcw>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditSelectForm