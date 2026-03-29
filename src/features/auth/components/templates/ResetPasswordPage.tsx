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
        if (verifiedToken)
            return <ResetPasswordForm></ResetPasswordForm>
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
