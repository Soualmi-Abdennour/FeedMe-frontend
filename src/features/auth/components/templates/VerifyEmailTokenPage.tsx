"use client"
import { setUser } from "@/features/user/store/user.slice"
import { useAppDispatch } from "@/store/base.store"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import VerificationProcess from "../../../../components/organism/VerificationProcess"
import { IDefaultVerificationProcessProps } from "../../../../types/props.types"
import { VERIFY_EMAIL_MESSAGES } from "../../constants/verifyEmail.constants"
import { useLazyVerifyTokenQuery } from "../../store/auth.api.slice"
import { setAuthState } from "../../store/auth.slice"
import VerifyTokenDefaultView from "../molecules/VerifyTokenDefaultView"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { ApiStatus, UserResponse } from "@/types/api.types"
import { mapUserDbToAppModel } from "@/features/user/utils/user.utils"

function VerifyEmailTokenPage({identifier}:{identifier:string}) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const params=useSearchParams()
    const token = params.get("token")?? ""


    const props: IDefaultVerificationProcessProps = {
        displayMessage: VERIFY_EMAIL_MESSAGES["DEFAULT"].dispalyMessage,
        identifier:identifier,
        resendVerificationEndpoint: "resend-verification-email",
        fallBack:{
            fallBackRedirectUrl:"/sign-up",
            fallBackButtonLabel:"Back to Sign up"
        }
    }

    const [verifyToken] = useLazyVerifyTokenQuery()


    const runVerifyTokenQuery = useCallback(async (): Promise<UserResponse> => {
        console.log("before");

        const fetchResponse = await verifyToken({
            token,
            endpoint: "verify-email-token"
        })
        console.log(fetchResponse);

        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse
        const errorResponse: UserResponse = error?.data as UserResponse
        return successResponse ?? errorResponse
    }, [verifyToken,token])

    const onSuccessFn = (successResponse: UserResponse) => {
        const successResponseData = successResponse.data
        dispatch(setAuthState({ jwtToken: successResponseData?.jwtToken! }))
        dispatch(setUser(mapUserDbToAppModel(successResponseData?.user!)))
        if (!successResponseData?.user?.isOnboardingCompleted)
            router.replace("/onboarding")
        else
            router.replace("/publication")
    }
    const onFailFn = () => {
        router.replace("/sign-up")
    }
    if (!token) return <VerifyTokenDefaultView props={props} />
    return (
        <VerificationProcess
            verificationMessages={VERIFY_EMAIL_MESSAGES}
            queryFn={runVerifyTokenQuery}
            onFailFn={onFailFn}
            onErrorFn={runVerifyTokenQuery}
            onSuccessFn={onSuccessFn}
        />
    )
}

export default VerifyEmailTokenPage