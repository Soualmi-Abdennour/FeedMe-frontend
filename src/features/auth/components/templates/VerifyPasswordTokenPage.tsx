"use client"
import { useSearchParams } from 'next/navigation'
import VerificationProcess from '../../../../components/organism/VerificationProcess'
import { IVerificationProps } from '../../../../types/props.types'
import { VERIFY_PASSWORD_MESSAGES } from '../../constants/verifyPassword.constants'
import { useVerifyTokenQuery } from '../../store/auth.api.slice'
import VerifyTokenDefaultView from '../molecules/VerifyTokenDefaultView'


function VerifyPasswordTokenPage() {
    const params = useSearchParams()
    const token = params.get("token")
    const props: IVerificationProps = {
        displayMessage: VERIFY_PASSWORD_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint:"forget-password"
    }
    if (!token) return <VerifyTokenDefaultView props={props}></VerifyTokenDefaultView>
    const { data, isLoading, refetch } = useVerifyTokenQuery({ token, endpoint: "verify-reset-password-token" })

    return (
        <VerificationProcess verificationMessages={VERIFY_PASSWORD_MESSAGES} queryProps={{ data, isLoading, queryFn: refetch }}></VerificationProcess>
    )
}

export default VerifyPasswordTokenPage
