"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode } from "react"
import VerificationProcess from '../../../../components/organism/VerificationProcess'
import { IVerificationProps } from '../../../../types/props.types'
import { VERIFY_PASSWORD_MESSAGES } from '../../constants/verifyPassword.constants'
import { useVerifyTokenQuery } from '../../store/auth.api.slice'
import VerifyTokenDefaultView from '../molecules/VerifyTokenDefaultView'
import ResetPasswordForm from '../organism/ResetPasswordForm'
import { updateNestedProperty } from '@/utils/object.utils'


function ResetPasswordPage() {
    const params = useSearchParams()
    const token = params.get("token") ?? ""
    const verifiedToken = params.get("verifiedToken")


    const props: IVerificationProps = {
        displayMessage: VERIFY_PASSWORD_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint: "forget-password"
    }
    const { data, isLoading, refetch } = useVerifyTokenQuery({ token, endpoint: "verify-reset-password-token" })

    const render = (): ReactNode => {
        if (!token)
            return <VerifyTokenDefaultView props={props}></VerifyTokenDefaultView>
        if (token && !verifiedToken){
            const UPDATED_VERIFY_PASSWORD_MESSAGES = updateNestedProperty(
                VERIFY_PASSWORD_MESSAGES,
                ["SUCCESS", "redirectTo"],
                VERIFY_PASSWORD_MESSAGES.SUCCESS.redirectTo?.replace("${verifiedToken}", token)
            )
            return <VerificationProcess verificationMessages={UPDATED_VERIFY_PASSWORD_MESSAGES} queryProps={{ data, isLoading, queryFn: refetch }}></VerificationProcess>
        }
        if (token === verifiedToken)
            return <ResetPasswordForm></ResetPasswordForm>
    }
    return (
        render()
    )
}

export default ResetPasswordPage
