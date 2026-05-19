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
        // to get data immediatly 
        const {status,data:responseData,message} = await resetPassword({
            identifier: userInState?.email!,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm
        }).unwrap()
        if(status==="FAIL"|| status==="ERROR") {
            toast.error(message)
        }
        else{
            toast.success(message)
            dispatch(setUser(responseData?.user!))
            reset()
            if(!responseData?.user?.isVerified){
                dispatch(setAuthState({jwtToken:responseData?.jwtToken!}))
                router.replace("/verify-email")
            }
            if (!responseData?.user?.isOnboardingCompleted)
                router.replace("/onboarding")
            else
                router.replace("/home")
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-7 py-10'
        >
            {RESET_PASSWORD_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                className='text-white font-bold '
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Reset Password"}
            </SubmitButton>
        </form>
    )
}

export default ResetPasswordForm
