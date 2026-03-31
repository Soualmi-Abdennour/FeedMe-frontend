"use client"
import { setUser } from "@/features/user/store/user.slice"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import VerificationProcess from "../../../../components/organism/VerificationProcess"
import { IVerificationProps } from "../../../../types/props.types"
import { VERIFY_EMAIL_MESSAGES } from "../../constants/verifyEmail.constants"
import { useVerifyTokenQuery } from "../../store/auth.api.slice"
import { setAuthState } from "../../store/auth.slice"
import VerifyTokenDefaultView from "../molecules/VerifyTokenDefaultView"
import { ApiResponse, UserResponse, UserResponseData } from "@/types/api.types"

function VerifyEmailTokenPage() {
    const params = useSearchParams()
    const dispatch = useAppDispatch()
    const token = params.get("token") ?? ""


    const props: IVerificationProps = {
        displayMessage: VERIFY_EMAIL_MESSAGES["DEFAULT"].dispalyMessage,
        resendVerificationEndpoint: "resend-verification-email"
    }
    
        const { data, isLoading, refetch } = useVerifyTokenQuery({
            token,
            endpoint: "verify-email-token"
        })
        const {data:responseData,status}=data as UserResponse
        useEffect(() => {
            if (status === "SUCCESS") {
                dispatch(setAuthState({ jwtToken: responseData?.jwtToken! }))
                dispatch(setUser(responseData?.user!))
            }
        }, [responseData, dispatch])

    if (!token) return <VerifyTokenDefaultView props={props} />


    const handleRefetch = async () => {
        const {status,data:responseData} = await refetch().unwrap()
        if(status==="SUCCESS"){
            dispatch(setAuthState({ jwtToken: responseData?.jwtToken! }))
            dispatch(setUser(responseData?.user!))
        }
    }

    return (
        <VerificationProcess
            verificationMessages={VERIFY_EMAIL_MESSAGES}
            queryProps={{ data, isLoading, queryFn: handleRefetch }}
        />
    )
}

export default VerifyEmailTokenPage