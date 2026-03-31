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
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SignupFormProps {
    className?: string
}
function SignupForm({className}: SignupFormProps) {
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
            className='max-w-[320px] mx-auto flex flex-col gap-3'
        >
            {SIGN_UP_FIELDS.map((formField)=>(
                <div key={formField.name}>
                    <FormField {...formField} control={control} errors={errors}></FormField>
                </div>
            ))}
            <SubmitButton
                disabled={isSubmitting}
                state={isSubmitting ? "LOADING" : "DEFAULT"}
                className='mt-4 text-white font-bold'
            >
                {isSubmitting?"Loading...":"Continue"}
            </SubmitButton>
            <Button variant="secondary" className='text-primary-500 font-bold'>
                <Link href="/sign-in">Sign in</Link>
            </Button>
        </form>
    )
}

export default SignupForm
