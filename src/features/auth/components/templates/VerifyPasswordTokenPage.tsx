"use client"
import { useSearchParams } from 'next/navigation'
import { VERIFY_EMAIL_MESSAGES } from '../../constants/verifyEmail.constants'
import { IVerifyTokenFormProps } from '../../types/props.types'
import VerifyTokenDefaultView from '../molecules/VerifyTokenDefaultView'
import VerifyTokenProcess from '../organism/VerifyTokenProcess'
import { VERIFY_PASSWORD_MESSAGES } from '../../constants/verifyPassword.constants'


function VerifyPasswordTokenPage() {
    const params = useSearchParams()
    const token = params.get("token")
    const props: IVerifyTokenFormProps = {
        displayMessage: VERIFY_PASSWORD_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint:"forget-password"
    }
    if (!token) return <VerifyTokenDefaultView props={props}></VerifyTokenDefaultView>
    return (
        <VerifyTokenProcess token={token} endpoint={'verify-reset-password-token'} verificationMessages={VERIFY_PASSWORD_MESSAGES}></VerifyTokenProcess>
    )
}

export default VerifyPasswordTokenPage
