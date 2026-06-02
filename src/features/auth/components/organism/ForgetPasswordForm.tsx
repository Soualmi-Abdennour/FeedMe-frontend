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
import { toast } from 'sonner'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { mapUserDbToAppModel } from '@/features/user/utils/user.utils'


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
            isSubmitting,
            isValid
        }
    } = useForm<IForgetPasswordForm>({
        resolver: zodResolver(forgetPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            identifier: process.env.NODE_ENV === "development" ? "abdousoualmi16@gmail.com" : "",
        }
    })
    const onSubmit = async (formData: IForgetPasswordForm) => {
        const fetchResponse = await forgetPassword({ identifier: formData.identifier, endpoint: "forget-password" })
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
        else{
            toast.success(successResponse.message)
            router.replace(`/reset-password?identifier=${formData.identifier}`)
            reset()
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-20 py-10'
        >
            {FORGET_PASSWORD_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                className='text-white font-bold '
                disabled={isSubmitting || !isValid}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Continue"}
            </SubmitButton>
        </form>
    )
}

export default ForgetPasswordForm
