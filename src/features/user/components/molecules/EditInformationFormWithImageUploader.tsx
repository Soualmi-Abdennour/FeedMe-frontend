"use client"
import SubmitButton from '@/components/atoms/SubmitButton';
import FormField from '@/components/molecules/FormField';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/base.store';
import { UserResponse } from '@/types/api.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUpdateProfileMutation } from '../../store/user.api.slice';
import { setUser } from '../../store/user.slice';
import { IEditInformationFormProps } from '../../types/props.types';
import { buildEditProfileFormData, mapUserDbToAppModel } from '../../utils/user.utils';
import ProfileImageDropZone from './ProfileImageDropZone';
import { MediaAppModel } from '@/features/studio-and-publication/types/media.types';
import { convertMediaDbModelToMediaAppModel } from '@/features/studio-and-publication/utils/media.utils';
import { ProfileImage } from '../../types/user.types';


function EditInformationFormWithImageUploader<FormSchema extends z.ZodType>({
    formFields,
    validationSchema,
    defaultValues,
    fieldToUpdate,
    endpoint
}: IEditInformationFormProps<FormSchema>) {    
    const dispatch = useAppDispatch()
    const [updateProfile] = useUpdateProfileMutation()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    const [profileImage, setProfileImage] = useState<ProfileImage>({
        previewUrl: defaultValues.profileImageUrl ?? defaultValues.restaurantLogoUrl,
        imageFile:undefined
    })
    
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
    const prevProfileImageUrl = defaultValues.profileImageUrl ?? defaultValues.restaurantLogoUrl
    const onSubmit = async (formData: z.infer<FormSchema>) => {
        const data=buildEditProfileFormData({
            data:{
                profile:{
                    [fieldToUpdate]:{
                        ...formData
                    }
                },
                avatarImageFile:profileImage?.imageFile
            },
            fieldToUpdate
        })
        
        const fetchResponse = await updateProfile({
            endpoint,
            data
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        if (error) {
            const errorResponse = error.data as UserResponse
            if (!errorResponse || errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
            }
        }
        else {
            const successResponseData = successResponse.data
            toast.success(successResponse.message)
            dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
            setEnableEdit(false)
        }
    }
    return (
        <div className='flex flex-col bg-white min-w-[1000px] m-auto gap-10 p-3 rounded-lg shadow-black-500 shadow-lg pb-5'>
            <div className='flex justify-between items-center gap-7 mx-5 '>
                <h3 className='text-xl pt-2'>Basic Information</h3>
                <Button
                    className=' justify-end text-white font-bold'
                    onClick={() => {
                        reset(defaultValues)
                        setProfileImage({
                            previewUrl: prevProfileImageUrl,
                                imageFile:undefined
                            }
                        )
                        setEnableEdit(state => !state)
                    }}
                >{enableEdit ? "Cancel" : "Edit"}</Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7 mx-20'>
                <div className='flex gap-10'>
                <div className='my-5 shrink-0'>
                    <ProfileImageDropZone profileImage={profileImage} setProfileImage={setProfileImage} disabled={!enableEdit} ></ProfileImageDropZone>
                </div>
                <div className='flex-1'>
                    {formFields.map((formField) => (
                        <div key={formField.name} >
                            <FormField {...formField} disabled={!enableEdit} control={control} errors={errors}></FormField>
                        </div>
                    ))}
                </div>
                </div>
                {enableEdit && (
                    <div className='flex text-white gap-2 font-bold'>
                        <SubmitButton
                            disabled={(!isDirty && prevProfileImageUrl===profileImage.previewUrl) || isSubmitting }
                            state={isSubmitting ? "LOADING" : "DEFAULT"}
                        >
                            {isSubmitting ? "Loading..." : "Update"}
                        </SubmitButton>
                        <Button
                            type='button'
                            disabled={!isDirty && prevProfileImageUrl === profileImage.previewUrl}
                            onClick={() => {
                                reset(defaultValues)
                                setProfileImage({
                                    previewUrl: prevProfileImageUrl,
                                    imageFile: undefined
                                }
                                )
                            }}
                            variant='primary'
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

export default EditInformationFormWithImageUploader
