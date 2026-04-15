"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/base.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateProfileMutation } from '../../store/user.api.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { toast } from 'sonner'
import { setUser } from '../../store/user.slice'
import { mapUserDbToAppModel } from '../../utils/user.utils'
import { editAccountSchema, EditAccountFormValues } from '../../schema/editAccount.schema'
import { CircleX, Pencil, RefreshCcw } from 'lucide-react'


interface Props {
    endpoint: "user" | "restaurant"
    defaultValues: {
        username: string   
        email: string      
    }
}

function EditAccountForm({ endpoint, defaultValues }: Props) {
    const dispatch = useAppDispatch()
    const [updateProfile] = useUpdateProfileMutation()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)

    const {
        handleSubmit,
        control,           
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm<EditAccountFormValues>({
        resolver: zodResolver(editAccountSchema),
        mode: "onChange",
        defaultValues: {
            username: defaultValues.username,
            email: defaultValues.email,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (formData: EditAccountFormValues) => {
        const accountPayload: Record<string, any> = {
            username: formData.username,
            email: formData.email,
        }

        if (formData.currentPassword) {
            accountPayload.currentPassword = formData.currentPassword
            accountPayload.newPassword = formData.newPassword
            accountPayload.confirmPassword = formData.confirmPassword
        }

        const fetchResponse = await updateProfile({
            endpoint,
            profile: accountPayload
        })

        const error = fetchResponse.error as FetchBaseQueryError
        const successResponse = fetchResponse.data as UserResponse

        if (error) {
            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something went wrong.")
            } else {
                toast.error(errorResponse.message)
            }
        } else {
            toast.success(successResponse.message)
            dispatch(setUser(mapUserDbToAppModel(successResponse.data?.user!)))
        }
    }

    return (
        <div className=' rounded-lg'>
            <div className='flex justify-between items-center text-2xl pb-4 pl-1'>
                <h3 className='text-2xl'>Info personality :</h3>
                <Button
                className='w-[110px] text-white font-medium text-xl'
                    onClick={() => {
                        reset()
                        setEnableEdit(state => !state)
                    }}
                >
                    {enableEdit ? "Cancel" : "Edit"}
                    {enableEdit ? <CircleX className='size-[24px] mx-1'></CircleX> : <Pencil className='size-[24px] mx-1'></Pencil>}
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <FormField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Enter your new username"
                        disabled={!enableEdit}
                        control={control}       
                        errors={errors}
                    />
                    <FormField
                        name="email"
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        disabled={!enableEdit}
                        control={control}
                        errors={errors}
                    />
                </div>
                {enableEdit && (
                    <div className='flex flex-col gap-4 pt-4 border-t'>
                        <p className='text-sm font-medium text-gray-500'>
                            Change Password <span className='font-normal'>(optional)</span>
                        </p>
                        <div className='flex flex-col gap-2'>
                            <FormField
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                placeholder="Enter current password"
                                control={control}
                                errors={errors}
                            />
                            <FormField
                                name="newPassword"
                                label="New Password"
                                type="password"
                                placeholder="Enter new password"
                                control={control}
                                errors={errors}
                            />
                            <FormField
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                placeholder="Confirm new password"
                                control={control}
                                errors={errors}
                            />
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
                            className='w-[145px]'
                            disabled={!isDirty}
                            onClick={() => reset()}
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