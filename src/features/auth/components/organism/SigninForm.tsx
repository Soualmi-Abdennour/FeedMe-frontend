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
    const onSubmit = async (data: ISigninForm) => {
        const userResponse = await signin(data)
        if (userResponse.error) {
            
            // fire a toast 
        } else {
            try {
                // extracting the user actual data not the response data {status,data(user)}
                const { data } = userResponse.data
                const { user } = data
                console.log(user);
                
                dispatch(setUser(user))
                reset()
                if (!user.isVerified)
                    router.replace('/verify-email')
                else
                    router.replace("/")
            }
            catch (e) {

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
