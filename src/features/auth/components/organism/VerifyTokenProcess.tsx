"use client"
import { useAppSelector } from '@/store/base.store'
import { useRouter, useSearchParams } from 'next/navigation'
import { VERIFY_EMAIL_MESSAGES } from '../../constants/verify.email.constants'
import { useVerifyTokenQuery } from '../../store/auth.api.slice'
import { IVerifyTokenFormProps } from '../../types/props.types'
import VerifyTokenForm from '../molecules/VerifyTokenView'



function VerifyTokenStateView({token}:{token:string}) {
    const { data, isLoading, refetch } = useVerifyTokenQuery(token)
    const { user } = useAppSelector(state => state.user)
    const router = useRouter()

    const getVerifyTokenFormProps = (): IVerifyTokenFormProps => {
        if (isLoading) {
            return {
                displayMessage: VERIFY_EMAIL_MESSAGES["LOADING"].dispalyMessage,
                buttonMessage: VERIFY_EMAIL_MESSAGES['LOADING'].buttonMessage,
                buttonState: "LOADING",
                buttonDisabled: true
            }
        } else if (data?.status === "SUCCESS") {
            return {
                displayMessage: VERIFY_EMAIL_MESSAGES["SUCCESS"].dispalyMessage,
                buttonMessage: VERIFY_EMAIL_MESSAGES["SUCCESS"].buttonMessage,
                buttonState: "SUCCESS",
                onClick: () => {
                    router.replace("/onboarding")
                }
            }
        } else if (data?.status === "ERROR") {
            return {
                displayMessage: VERIFY_EMAIL_MESSAGES["ERROR"].dispalyMessage,
                buttonMessage: VERIFY_EMAIL_MESSAGES["ERROR"].buttonMessage,
                buttonState: "ERROR",
                onClick: () => {
                    refetch()
                }
            }
        } else {
            return {
                displayMessage: VERIFY_EMAIL_MESSAGES["FAIL"].dispalyMessage,
                buttonMessage: VERIFY_EMAIL_MESSAGES["FAIL"].buttonMessage,
                buttonState: "FAIL",
                onClick: () => {
                    router.replace("/sign-up")
                }
            }
        }
    }


    return (
        <VerifyTokenForm props={getVerifyTokenFormProps()}></VerifyTokenForm>
    )
}

export default VerifyTokenStateView
