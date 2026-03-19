"use client"

import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { useAppSelector } from '@/store/base.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../user/store/user.slice'
import { SIGN_UP_FIELDS } from '../../constants/sign-up.constants'
import { ISignupForm, signupFormSchema } from '../../schema/signup.schema'
import { useSingupMutation } from '../../store/auth.api.slice'

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
    const onSubmit=async (data:ISignupForm)=>{
        const userResponse=await signup(data)
        if(userResponse.error) {            
            // fire a toast 
        }else {
            try{
                // extracting the user actual data not the response data {status,data(user)}
                const {data}=userResponse.data
                const {user}=data
                console.log(user);
                
                dispatch(setUser(user))
                reset()
                router.replace('/verify-email')
            }
            catch(e){

            }
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
                state={isSubmitting?"LOADING":"NORMAL"}
            >
                {isSubmitting?"Loading...":"Continue"}
            </SubmitButton>
        </form>
    )
}

export default SignupForm
