"use client"
import { ApiResponse, ApiStatus, UserResponse, VerificationResponse } from '@/types/api.types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IVerificationProcessProps, VerificationProcessState,IVerificationViewProps } from '../../types/props.types'
import VerificationView from '../molecules/VerificationView'



function VerificationProcess({ verificationMessages,queryFn, onSuccessFn,onErrorFn,onFailFn }:IVerificationProcessProps) {
    const [verificationResponse, setVerificationResponse]=useState<VerificationResponse>()
    
    const getVerifyProps = (): IVerificationViewProps => {
        if (verificationResponse?.status === "ERROR") {
            return {
                title : "ERROR!",
                displayMessage: verificationMessages["ERROR"].dispalyMessage,
                buttonMessage: verificationMessages["ERROR"].buttonMessage,
                buttonState: "ERROR",
                onClick: () => {
                    onErrorFn(verificationResponse)
                },
                imageUrl:"/verify/error.svg"
            }
        } else if (verificationResponse?.status=== "FAIL") {
            return {
                title : "FAIL!",
                displayMessage: verificationMessages["FAIL"].dispalyMessage,
                buttonMessage: verificationMessages["FAIL"].buttonMessage,
                buttonState: "FAIL",
                onClick: () => {
                    onFailFn()
                },
                imageUrl:"/verify/fail.svg"
            }
        }
        else if (verificationResponse?.status === "SUCCESS") {            
            return {
                title : "SUCCESS!",
                displayMessage: verificationMessages["SUCCESS"].dispalyMessage,
                buttonMessage: verificationMessages["SUCCESS"].buttonMessage,
                buttonState: "SUCCESS",
                onClick: () => {
                    onSuccessFn(verificationResponse)
                },
                imageUrl:"/verify/success.svg"
            }
        }
        else {
            return {
                displayMessage: verificationMessages["LOADING"].dispalyMessage,
                buttonMessage: verificationMessages['LOADING'].buttonMessage,
                buttonState: "LOADING",
                buttonDisabled: true,
                imageUrl:"/verify/loading.svg"
            }
        }
    }
    useEffect(() => {  
        const updateVerificationState=async()=>{
            const verificationResponse =await queryFn()
            console.log("from use effect");
            

            setVerificationResponse(verificationResponse)
        }
        updateVerificationState()      
    }, [queryFn])
    return (
        <VerificationView props={getVerifyProps()}></VerificationView>
    )
}

export default VerificationProcess
