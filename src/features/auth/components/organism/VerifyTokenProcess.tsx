"use client"
import { useAppSelector } from '@/store/base.store'
import { useRouter } from 'next/navigation'
import { VERIFY_EMAIL_MESSAGES } from '../../constants/verifyEmail.constants'
import { useVerifyTokenQuery } from '../../store/auth.api.slice'
import { IVerifyTokenFormProps } from '../../types/props.types'
import VerifyTokenView from '../molecules/VerifyTokenView'
import { VerificationProcessState } from "../../types/props.types";



function VerifyTokenProcess({ token, endpoint, verificationMessages }: { token: string, endpoint: string, verificationMessages: VerificationProcessState }) {
    const { data, isLoading, refetch } = useVerifyTokenQuery({token,endpoint})
    const { user } = useAppSelector(state => state.user)
    const router = useRouter()

    const getVerifyTokenFormProps = (): IVerifyTokenFormProps => {
        if (isLoading) {
            return {
                displayMessage: verificationMessages["LOADING"].dispalyMessage,
                buttonMessage: verificationMessages['LOADING'].buttonMessage,
                buttonState: "LOADING",
                buttonDisabled: true
            }
        } else if (data?.status === "SUCCESS") {
            return {
                displayMessage: verificationMessages["SUCCESS"].dispalyMessage,
                buttonMessage: verificationMessages["SUCCESS"].buttonMessage,
                buttonState: "SUCCESS",
                onClick: () => {
                    router.replace(verificationMessages["SUCCESS"].redirectTo!)
                }
            }
        } else if (data?.status === "ERROR") {
            return {
                displayMessage: verificationMessages["ERROR"].dispalyMessage,
                buttonMessage: verificationMessages["ERROR"].buttonMessage,
                buttonState: "ERROR",
                onClick: () => {
                    refetch()
                }
            }
        } else {
            return {
                displayMessage: verificationMessages["FAIL"].dispalyMessage,
                buttonMessage: verificationMessages["FAIL"].buttonMessage,
                buttonState: "FAIL",
                onClick: () => {
                    router.replace(verificationMessages["FAIL"].redirectTo!)
                }
            }
        }
    }


    return (
        <VerifyTokenView props={getVerifyTokenFormProps()}></VerifyTokenView>
    )
}

export default VerifyTokenProcess
