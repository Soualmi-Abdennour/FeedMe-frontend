"use client"
import { OnboardingStepPayloadModel } from "@/features/onboarding/types/onboarding.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { IFormField } from '@/types/props.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { INormalUserOnboardingForm, normalUserOnboardingFormSchema } from '../../schema/normalUserOnboarding.schema'
import { setStep } from '../../store/onboarding.slice'
import { NormalUserProfile, RestaurantUserProfile } from '@/features/user/types/user.types'
import { z } from 'zod'


type stepMetadataType={
    step:number,
    correspondProfileField:keyof NormalUserProfile | keyof RestaurantUserProfile
}

function InformationForm<TSchema extends z.ZodType>({
    formFields,
    validationSchema,
    defaultValues,
    stepMetadata
}: {
    defaultValues: z.infer<TSchema>;
    validationSchema: TSchema;
    stepMetadata: stepMetadataType
    formFields: Omit<IFormField, "errors" | "control">[];
}) {

    console.log(defaultValues);
    
    const dispatch = useAppDispatch()
    const {
        handleSubmit,
        control,
        reset,
        formState:{errors,isSubmitting}
    } = useForm<z.infer<TSchema>>({
        resolver: zodResolver(validationSchema),
        mode:"onChange",
        defaultValues,
    })
    const onSubmit = (data: z.infer<TSchema>)=>{

        
        dispatch(setStep({
            step:stepMetadata.step,
            values:{
                [String(stepMetadata.correspondProfileField)]:data
            }
        })
    )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Continue"}
            </SubmitButton>
        </form>
    )
}

export default InformationForm
