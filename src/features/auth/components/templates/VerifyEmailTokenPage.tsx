"use client"
import { useSearchParams } from 'next/navigation'
import { VERIFY_EMAIL_MESSAGES } from '../../constants/verifyEmail.constants'
import { IVerifyTokenFormProps } from '../../types/props.types'
import VerifyTokenDefaultView from '../molecules/VerifyTokenDefaultView'
import VerifyTokenProcess from '../organism/VerifyTokenProcess'


function VerifyEmailTokenPage() {
    const params = useSearchParams()
    const token = params.get("token")    
    const props: IVerifyTokenFormProps = {
        displayMessage: VERIFY_EMAIL_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint:"sent-verification-email"
    }
    if (!token) return <VerifyTokenDefaultView props={props}></VerifyTokenDefaultView>
    return (
        <VerifyTokenProcess token={token} endpoint={'/verify-email-token'} verificationMessages={VERIFY_EMAIL_MESSAGES}></VerifyTokenProcess>
    )
}

export default VerifyEmailTokenPage
