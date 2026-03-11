"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { setUser } from '@/features/user/store/user.slice'
import { useAppDispatch } from '@/store/base.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FORGET_PASSWORD_FIELDS } from '../../constants/forgetPassword.constants'
import { forgetPasswordFormSchema, IForgetPasswordForm } from '../../schema/forgetPassword.schema'
import { useSendVerificationEmailMutation } from '../../store/auth.api.slice'


function ForgetPasswordForm() {
    const router = useRouter()
    const [forgetPassword] = useSendVerificationEmailMutation()
    const dispatch=useAppDispatch()
    const {
        handleSubmit,
        control,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<IForgetPasswordForm>({
        resolver: zodResolver(forgetPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            identifier: process.env.NODE_ENV === "development" ? "abdousoualmi16@gmail.com" : "",
        }
    })
    const onSubmit = async (data: IForgetPasswordForm) => {
        // to get data immediatly 
        const reposnse = await forgetPassword({ identifier: data.identifier,endpoint:"/forget-password"}).unwrap()
        if (reposnse?.status ==="SUCCESS"){
            dispatch(setUser(reposnse.data?.user!))
            reset()
            router.replace("/verify-reset-password")
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
        >
            {FORGET_PASSWORD_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Send the Link"}
            </SubmitButton>
        </form>
    )
}

export default ForgetPasswordForm
