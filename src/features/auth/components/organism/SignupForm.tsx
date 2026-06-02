"use client"

import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { Button } from '@/components/ui/button'
import { UserResponse } from '@/types/api.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SIGN_UP_FIELDS } from '../../constants/signup.constants'
import { ISignupForm, signupFormSchema } from '../../schema/signup.schema'
import { useSingupMutation } from '../../store/auth.api.slice'

interface SignupFormProps {
    className?: string
}
function SignupForm({ className }: SignupFormProps) {
    const router = useRouter()
    const [signup] = useSingupMutation()
    const {
        handleSubmit,
        control,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<ISignupForm>({
        resolver: zodResolver(signupFormSchema),
        mode: "onChange",
        defaultValues: {
            userName: process.env.NODE_ENV === "development" ? "fieldmarschall" : "",
            email: process.env.NODE_ENV === "development" ? "abdousoualmi16@gmail.com" : "",
            password: process.env.NODE_ENV === "development" ? "Anything+13" : "",
            passwordConfirm: process.env.NODE_ENV === 'development' ? "Anything+13" : ""
        }
    })
    const onSubmit = async (formData: ISignupForm) => {
        
        const fetchResponse = await signup(formData)
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse

        if (error) {                        
            const errorResponse = error.data as UserResponse            
            if (!errorResponse || errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {                
                toast.error(errorResponse.errors?.at(0)?.message?? errorResponse.message)
            }
        }
        else {
            toast.success(successResponse.message)
            router.replace(`/verify-email?identifier=${formData.email}`)
            reset()
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-[320px] mx-auto flex flex-col gap-3'
        >
            {SIGN_UP_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
                className='mt-4 text-white font-bold'
            >
                {isSubmitting ? "Loading..." : "Continue"}
            </SubmitButton>
            <Link href="/sign-in" >
                <Button variant="secondary" className='text-primary-500 font-bold w-full' type='button'>
                    Sign in
                </Button>
            </Link>
        </form>
    )
}

export default SignupForm
