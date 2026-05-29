"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/base.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateAccountMutation, useUpdateProfileMutation } from '../../store/user.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { setUser } from '../../store/user.slice'
import { mapUserDbToAppModel } from '../../utils/user.utils'
import { editAccountSchema, EditAccountFormValues } from '../../schema/editAccount.schema'
import { CircleX, Pencil, RefreshCcw } from 'lucide-react'
import { EDIT_ACCOUNT_FORM_FIELDS } from '../../constants/editAccount.constants'
import { setAuthState } from '@/features/auth/store/auth.slice'


interface Props {
    defaultValues: {
        userName: string   
        email: string  
        currentPassword:string,
        newPassword:string,
        newPasswordConfirm:string,    
    }
}

function EditAccountForm({ defaultValues }: Props) {
    const dispatch = useAppDispatch()
    const [updateAccount] = useUpdateAccountMutation()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)

    const {
        handleSubmit,
        control,           
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm<EditAccountFormValues>({
        resolver: zodResolver(editAccountSchema),
        mode: "onChange",
        defaultValues
    })

    const onSubmit = async (formData: EditAccountFormValues) => {

        const fetchResponse = await updateAccount(formData)

        const error = fetchResponse.error as FetchBaseQueryError
        const successResponse = fetchResponse.data as UserResponse

        if (error) {
            const errorResponse = error.data as UserResponse
            if (error.status || errorResponse.status === "ERROR") {
                toast.error("Something went wrong.")
            } else {
                toast.error(errorResponse.message)
            }
        } else {
            toast.success(successResponse.message)
            dispatch(setUser(mapUserDbToAppModel(successResponse.data?.user!)))
            dispatch(setAuthState({
                jwtToken:successResponse.data?.jwtToken!
            }))
            setEnableEdit(false)
        }
    }

    return (
        <div className='p-3  bg-white rounded-lg shadow-black-500 shadow-lg'>
            <div className='flex justify-between items-center text-2xl pb-4 pl-1'>
                <h3 className='text-2xl'>Info personality :</h3>
                <Button
                className='w-[110px] text-white font-medium text-lg'
                    onClick={() => {
                        reset(defaultValues)
                        setEnableEdit(state => !state)
                    }}
                >
                    {enableEdit ? "Cancel" : "Edit"}
                    {enableEdit ? <CircleX className='size-[24px] mx-1'></CircleX> : <Pencil className='size-[24px] mx-1'></Pencil>}
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    {EDIT_ACCOUNT_FORM_FIELDS.slice(0,2).map((formField)=>(
                        <div key={formField.name} >
                            <FormField {...formField} control={control} errors={errors} disabled={!enableEdit}></FormField>
                        </div>
                    ))}
                </div>
                {enableEdit && (
                    <div className='flex flex-col gap-4 pt-4 border-t'>
                        <p className='text-sm font-medium text-gray-500'>
                            Change Password <span className='font-normal'>(optional)</span>
                        </p>
                        <div className='flex flex-col gap-2'>
                            {EDIT_ACCOUNT_FORM_FIELDS.slice(2,).map((formField) => (
                                <div key={formField.name} >
                                    <FormField {...formField} control={control} errors={errors}></FormField>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {enableEdit && (
                    <div className='flex gap-2'>
                        <SubmitButton
                        className='w-[145px]'
                            disabled={!isDirty || isSubmitting}
                            state={isSubmitting ? "LOADING" : "DEFAULT"}
                        >
                            {isSubmitting ? "Loading..." : "Update"}
                        </SubmitButton>
                        <Button
                            type='button'
                            className='w-[145px]  text-white font-bold'
                            disabled={!isDirty}
                            onClick={() => reset(defaultValues)}
                        >
                            Reset
                            <RefreshCcw></RefreshCcw>
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditAccountForm