"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { setUser } from '@/features/user/store/user.slice'
import { useAppDispatch, useAppSelector } from '@/store/base.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { RESET_PASSWORD_FIELDS } from '../../constants/resetPassword.constants'
import { IResetPasswordForm, resetPasswordFormSchema } from '../../schema/resetPassword.schema'
import { useResetPasswordMutation } from '../../store/auth.api.slice'
import { setAuthState } from '../../store/auth.slice'
import { toast } from 'sonner'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { mapUserDbToAppModel } from '@/features/user/utils/user.utils'


function ResetPasswordForm() {
    const router = useRouter()
    const [resetPassword] = useResetPasswordMutation()
    const dispatch = useAppDispatch()
    const { user:userInState } = useAppSelector(state => state.user)
    const {
        handleSubmit,
        control,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<IResetPasswordForm>({
        resolver: zodResolver(resetPasswordFormSchema),
        mode: "onChange",
        defaultValues:{
            password:"",
            passwordConfirm:""
        }
    })
    const onSubmit = async (formData: IResetPasswordForm) => {
        const fetchResponse = await resetPassword({
            identifier: userInState?.email!,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse

        if (error) {
            const errorResponse = error.data as UserResponse
            // if(status==="FAIL"|| status==="ERROR") {
            toast.error(errorResponse.message)
        // }
        }
        else{
            const successResponseData = successResponse.data
            toast.success(successResponse.message)
            dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
            reset()
            if (!successResponseData?.user?.isVerified) {
                router.replace("/verify-email")
                dispatch(setAuthState({ jwtToken: successResponseData?.jwtToken! }))
            }
            if (!successResponseData?.user?.isOnboardingCompleted)
                router.replace("/onboarding")
            else
                router.replace("/home")
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
        >
            {RESET_PASSWORD_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Reset Password"}
            </SubmitButton>
        </form>
    )
}

export default ResetPasswordForm
