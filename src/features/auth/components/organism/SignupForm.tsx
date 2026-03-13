"use client"

import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../user/store/user.slice'
import { SIGN_UP_FIELDS } from '../../constants/signup.constants'
import { ISignupForm, signupFormSchema } from '../../schema/signup.schema'
import { useSingupMutation } from '../../store/auth.api.slice'
import { toast } from 'sonner'


function SignupForm() {
    const router=useRouter()
    const [signup]=useSingupMutation()
    const dispatch=useDispatch()
    const {
        handleSubmit,
        control,
        reset,
        formState:{
            errors,
            isSubmitting
        }
    }=useForm<ISignupForm>({
        resolver:zodResolver(signupFormSchema),
        mode:"onChange",
        defaultValues:{
            userName:process.env.NODE_ENV==="development"?"fieldmarschall":"",
            email:process.env.NODE_ENV==="development"?"abdousoualmi16@gmail.com":"",
            password:process.env.NODE_ENV==="development"?"Anything+13":"",
            passwordConfirm:process.env.NODE_ENV==='development'?"Anything+13":""
        }
    })
    const onSubmit=async (formData:ISignupForm)=>{
        const {status,data:responseData,message}=await signup(formData).unwrap()

        if (status === "ERROR" || status === "FAIL") {   
            toast.error(message)                     
        }
        else {
                toast.success(message)
                dispatch(setUser(responseData?.user!))
                reset()
                router.replace('/verify-email')
        } 
    }
    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
        >
            {SIGN_UP_FIELDS.map((formField)=>(
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
            >
                {isSubmitting?"Loading...":"Sign up"}
            </SubmitButton>
        </form>
    )
}

export default SignupForm
