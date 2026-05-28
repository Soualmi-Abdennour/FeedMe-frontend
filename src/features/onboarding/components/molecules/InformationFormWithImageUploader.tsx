"use client"
import SubmitButton from '@/components/atoms/SubmitButton';
import FormField from '@/components/molecules/FormField';
import ProfileImageDropZone from '@/features/user/components/molecules/ProfileImageDropZone';
import { NormalUserProfileAppModel, ProfileImage, RestaurantUserProfileAppModel } from '@/features/user/types/user.types';
import { useAppDispatch } from '@/store/base.store';
import { IFormField } from '@/types/props.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { setStep } from '../../store/onboarding.slice';


type stepMetadataType = {
    step: number,
    correspondProfileField: keyof NormalUserProfileAppModel | keyof RestaurantUserProfileAppModel
}

function InformationFormWithImageUploader<TSchema extends z.ZodType>({
    formFields,
    validationSchema,
    defaultValues,
    stepMetadata,
    defaultAvatarImageFile
}: {
    defaultValues: z.infer<TSchema>;
        defaultAvatarImageFile?:File
    validationSchema: TSchema;
    stepMetadata: stepMetadataType
    formFields: Omit<IFormField, "errors" | "control">[];
}) {

    const dispatch = useAppDispatch()
    const [profileImage, setProfileImage] = useState<ProfileImage>({
        previewUrl: defaultAvatarImageFile && URL.createObjectURL(defaultAvatarImageFile),
        imageFile: defaultAvatarImageFile
    })
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<TSchema>>({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
        defaultValues,
    })
    
    const onSubmit = (formData: z.infer<TSchema>) => {
        dispatch(setStep({
            step: stepMetadata.step,
            values: {
                [String(stepMetadata.correspondProfileField)]: formData
            },
            avatarImageFile:profileImage?.imageFile
        })
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-5'>
                <ProfileImageDropZone profileImage={profileImage} setProfileImage={setProfileImage}></ProfileImageDropZone>
            </div>
            {formFields.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>))}
            <SubmitButton
                disabled={isSubmitting}
                className="w-full mt-13"
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Continue"}
            </SubmitButton>
        </form>
    )
}

export default InformationFormWithImageUploader
