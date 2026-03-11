"use client"
import { VerificationResponse } from '@/types/api.types'
import { useRouter } from 'next/navigation'
import { IVerificationProps, VerificationProcessState } from '../../types/props.types'
import VerificationView from '../molecules/VerificationView'

type queryProps = {
    data: VerificationResponse | undefined;
    isLoading: boolean;
    queryFn: () => void
}

function VerificationProcess({ verificationMessages, queryProps }: { verificationMessages: VerificationProcessState, queryProps: queryProps }) {
    const { data, isLoading, queryFn } = queryProps
    
    const router = useRouter()
    const getVerifyProps = (): IVerificationProps => {
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
                    queryFn()
                }
            }
        } else  {
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
        <VerificationView props={getVerifyProps()}></VerificationView>
    )
}

export default VerificationProcess
