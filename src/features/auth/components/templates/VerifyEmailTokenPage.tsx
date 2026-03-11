"use client"
import { setUser } from "@/features/user/store/user.slice"
import { useAppDispatch } from "@/store/base.store"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import VerificationProcess from "../../../../components/organism/VerificationProcess"
import { IVerificationProps } from "../../../../types/props.types"
import { VERIFY_EMAIL_MESSAGES } from "../../constants/verifyEmail.constants"
import { useVerifyTokenQuery } from "../../store/auth.api.slice"
import { setAuthState } from "../../store/auth.slice"
import VerifyTokenDefaultView from "../molecules/VerifyTokenDefaultView"

function VerifyEmailTokenPage() {

    const params = useSearchParams()
    const dispatch = useAppDispatch()
    const token = params.get("token")

    const props: IVerificationProps = {
        displayMessage: VERIFY_EMAIL_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint: "resend-verification-email"
    }

    if (!token) return <VerifyTokenDefaultView props={props} />

    const { data, isLoading, refetch } = useVerifyTokenQuery({
        token,
        endpoint: "verify-email-token"
    })

    // ✅ Correct place for dispatch
    useEffect(() => {
        if (data?.status === "SUCCESS") {
            dispatch(setAuthState({ jwtToken: data.data?.jwtToken! }))
            dispatch(setUser(data.data?.user!))
        }
    }, [data, dispatch])

    const handleRefetch = async () => {
        const result = await refetch().unwrap()

        dispatch(setAuthState({ jwtToken: result.data?.jwtToken! }))
        dispatch(setUser(result.data?.user!))
    }

    return (
        <VerificationProcess
            verificationMessages={VERIFY_EMAIL_MESSAGES}
            queryProps={{ data, isLoading, queryFn: handleRefetch }}
        />
    )
}

export default VerifyEmailTokenPage