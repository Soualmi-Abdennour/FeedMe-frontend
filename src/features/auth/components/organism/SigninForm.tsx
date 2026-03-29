"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../user/store/user.slice'
import { SIGN_IN_FIELDS } from '../../constants/signin.constants'
import { ISigninForm, signinFormSchema } from '../../schema/signin.schema'
import { useSigninMutation } from '../../store/auth.api.slice'
import { setAuthState } from '../../store/auth.slice'
import { toast } from 'sonner'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UserResponse } from '@/types/api.types'
import { mapUserDbToAppModel } from '@/features/user/utils/user.utils'


function SigninForm() {
    const router = useRouter()
    const [signin] = useSigninMutation()
    const dispatch = useDispatch()
    const {
        handleSubmit,
        control,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<ISigninForm>({
        resolver: zodResolver(signinFormSchema),
        mode: "onChange",
        defaultValues: {
            identifier: process.env.NODE_ENV === "development" ? "abdousoualmi16@gmail.com" : "",
            password: process.env.NODE_ENV === "development" ? "Anything123+" : "",
        }
    })
    const onSubmit = async (formData: ISigninForm) => {
        const fetchResponse = await signin(formData)
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        console.log(error);

        if (error) {
            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.message)
            }
        }
        else {
            const successResponseData = successResponse.data
            toast.success(successResponse.message)
            console.log("from sign in");

            console.log(mapUserDbToAppModel(successResponseData?.user!));

            dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
            reset()
            if (!successResponseData?.user.isVerified) {
                router.replace('/verify-email')
            }
            else if (!successResponseData.user.isOnboardingCompleted) {
                dispatch(setAuthState({ jwtToken: successResponseData?.jwtToken! }))
                router.replace("/onboarding")
            } else {
                dispatch(setAuthState({ jwtToken: successResponseData?.jwtToken! }))
                router.replace("/home")
            }
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
        >
            {SIGN_IN_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Sign ip"}
            </SubmitButton>
        </form>
    )
}

export default SigninForm
