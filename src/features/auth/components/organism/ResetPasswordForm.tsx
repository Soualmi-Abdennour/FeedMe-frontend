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


function ResetPasswordForm() {
    const router = useRouter()
    const [resetPassword] = useResetPasswordMutation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.user)
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
    const onSubmit = async (data: IResetPasswordForm) => {
        // to get data immediatly 
        const reposnse = await resetPassword({
            identifier:user?.email!,
            password:data.password,
            passwordConfirm:data.passwordConfirm
        }).unwrap()
        if (reposnse?.status === "SUCCESS"){
            dispatch(setUser(reposnse.data?.user!))
            reset()
            if(!user?.isVerified){
                dispatch(setAuthState({jwtToken:reposnse.data?.jwtToken!}))
                router.replace("/verify-email")
            }
            if(!user?.isOnboardingCompleted)
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
