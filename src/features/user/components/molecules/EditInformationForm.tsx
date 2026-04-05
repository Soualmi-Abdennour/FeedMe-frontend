"use client"
import SubmitButton from '@/components/atoms/SubmitButton';
import FormField from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/base.store';
import { IFormField } from '@/types/props.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateProfileMutation } from '../../store/user.api.slice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { UserResponse } from '@/types/api.types';
import { toast } from 'sonner';
import { setUser } from '../../store/user.slice';
import { mapUserDbToAppModel } from '../../utils/user.utils';
import { IEditInformationFormProps } from '../../types/props.types';



function EditInformationForm<FormSchema extends z.ZodType>({
    formFields,
    validationSchema,
    defaultValues,
    fieldToUpdate,
    endpoint
}: IEditInformationFormProps<FormSchema>) {
    const dispatch = useAppDispatch()
    const [updateProfile] = useUpdateProfileMutation()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm<z.infer<FormSchema>>({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
        defaultValues
    })
    const onSubmit = async (formData: z.infer<FormSchema>) => {
        const fetchResponse = await updateProfile({
            endpoint,
            profile: {
                [fieldToUpdate]: {
                    ...formData
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
                <h3>Basic Information</h3>
                <Button
                    onClick={() => {
                        reset()
                        setEnableEdit(state => !state)
                    }}
                >{enableEdit ? "Cancel" : "Edit"}</Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <div className='grid grid-cols-2 gap-5'>
                    {formFields.map((formField) => (
                        <div key={formField.name}>
                            <FormField {...formField} disabled={!enableEdit} control={control} errors={errors}></FormField>
                        </div>
                    ))}
                </div>
                {enableEdit && (
                    <div className='flex gap-2'>
                        <SubmitButton
                            disabled={!isDirty || isSubmitting}
                            state={isSubmitting ? "LOADING" : "DEFAULT"}
                        >
                            {isSubmitting ? "Loading..." : "Update"}
                        </SubmitButton>
                        <Button
                            type='button'
                            disabled={!isDirty}
                            onClick={() => reset()}
                        >
                            Reset
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditInformationForm
