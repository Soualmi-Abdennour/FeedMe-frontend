"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useCallback, useState } from "react"
import VerificationProcess from '../../../../components/organism/VerificationProcess'
import { IDefaultVerificationProcessProps } from '../../../../types/props.types'
import { VERIFY_PASSWORD_MESSAGES } from '../../constants/verifyPassword.constants'
import { useLazyVerifyTokenQuery } from '../../store/auth.api.slice'
import VerifyTokenDefaultView from '../molecules/VerifyTokenDefaultView'
import ResetPasswordForm from '../organism/ResetPasswordForm'
import { updateNestedProperty } from '@/utils/object.utils'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ApiStatus, UserResponse, VerificationResponse } from '@/types/api.types'
import Image from 'next/image'


function ResetPasswordPage() {
    const params = useSearchParams()
    const router=useRouter()
    const token = params.get("token") ?? ""
    const verifiedToken = params.get("verifiedToken")


    const props: IDefaultVerificationProcessProps = {
        displayMessage: VERIFY_PASSWORD_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint: "forget-password"
    }
    const [verifyToken] = useLazyVerifyTokenQuery()


    const runVerifyTokenQuery=useCallback(async():Promise<UserResponse>=>{
        const fetchResponse=await verifyToken({ token, endpoint: "verify-reset-password-token" })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        const errorResponse: UserResponse = error?.data as UserResponse
        return successResponse?? errorResponse

    },[verifyToken,token])

    const onSuccessFn = () => {
        router.replace(`/reset-password?verifiedToken=${token}`)
    }
    const onFailFn = () => {
        router.replace("/forget-password")
    }
    const render = (): ReactNode => {
        if (true)
            return(
            <div className="max-w-[512px]  pt-3 mx-auto  w-full flex flex-col  gap-5">
                <div className='py-2 px-4 bg-orange-500 rounded-md mx-auto'>
                <h4 className='text-white'>FeedMe</h4>
            </div>
            <div 
                className="relative min-h-[550px] shadow-1 pt-8 pb-13 px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                <Image
                    src={'sign-up/bck-form.svg'}
                    fill
                    alt='bck'
                    className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                ></Image>
                <div className="text-center">
                    <h4>Welcome!</h4>
                    <p className="body-text text-neutral-500 mb-4">
                        Fill in the information in order to listen with us
                    </p>
                    <ResetPasswordForm ></ResetPasswordForm>
                </div>
            </div>
            </div>
            ) 
        if (token){
            return <VerificationProcess 
                verificationMessages={VERIFY_PASSWORD_MESSAGES} 
                onErrorFn={runVerifyTokenQuery}
                onFailFn={onFailFn}
                onSuccessFn={onSuccessFn}
                queryFn={runVerifyTokenQuery }>
                </VerificationProcess>
        }
        return <VerifyTokenDefaultView props={props}></VerifyTokenDefaultView>
    }
    return (
        render()
    )
}

export default ResetPasswordPage
