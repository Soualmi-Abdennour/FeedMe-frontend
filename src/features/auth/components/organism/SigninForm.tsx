"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { Button } from '@/components/ui/button'
import { mapUserDbToAppModel } from '@/features/user/utils/user.utils'
import { UserResponse } from '@/types/api.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '../../../user/store/user.slice'
import { SIGN_IN_FIELDS } from '../../constants/signin.constants'
import { ISigninForm, signinFormSchema } from '../../schema/signin.schema'
import { useSigninMutation } from '../../store/auth.api.slice'
import { setAuthState } from '../../store/auth.slice'


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
            isSubmitting,
            isValid
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
            console.log(successResponseData);
            toast.success(successResponse.message)
            reset()
            if (!successResponseData?.user.isVerified) {
                router.replace(`/verify-email?identifier=${successResponseData?.user.email}`)
            }
            else if (!successResponseData.user.isOnboardingCompleted) {
                dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
                dispatch(setAuthState({ jwtToken: successResponseData?.jwtToken! }))
                router.replace("/onboarding")
            } else {
                dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
                dispatch(setAuthState({ jwtToken: successResponseData?.jwtToken! }))
                router.replace("/publication")
            }
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 '
        >
            {SIGN_IN_FIELDS.map((formField) => (
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <button
                className='text-neutral-500 cursor-pointer hover:text-orange-500/50 self-end'
            >
                <a href="/forget-password">Forget password?</a>
            </button>
            <SubmitButton
                className=' text-white font-bold'
                disabled={isSubmitting ||!isValid}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting ? "Loading..." : "Continue"}
            </SubmitButton>
            <Link href="/sign-up" >
            <Button variant="secondary" className='text-primary-500 font-bold w-full' type='button'>
                Sign up
            </Button>
        </Link>
        </form>
    )
}

export default SigninForm