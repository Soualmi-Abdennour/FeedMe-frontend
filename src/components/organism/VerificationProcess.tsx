"use client"
import { ApiResponse, ApiStatus, UserResponse } from '@/types/api.types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IVerificationProcessProps, VerificationProcessState,IVerificationViewProps } from '../../types/props.types'
import VerificationView from '../molecules/VerificationView'



function VerificationProcess({ verificationMessages,queryFn, onSuccessFn,onErrorFn,onFailFn }:IVerificationProcessProps) {
    const [verificationResponse,setVerificationResponse]=useState<UserResponse>()
    
    const getVerifyProps = (): IVerificationViewProps => {
        if (verificationResponse?.status === "ERROR") {
            return {
                displayMessage: verificationMessages["ERROR"].dispalyMessage,
                buttonMessage: verificationMessages["ERROR"].buttonMessage,
                buttonState: "ERROR",
                onClick: () => {
                    onErrorFn(verificationResponse)
                }
            }
        } else if (verificationResponse?.status=== "FAIL") {
            return {
                displayMessage: verificationMessages["FAIL"].dispalyMessage,
                buttonMessage: verificationMessages["FAIL"].buttonMessage,
                buttonState: "FAIL",
                onClick: () => {
                    onFailFn()
                }
            }
        }
        else if (verificationResponse?.status === "SUCCESS") {            
            return {
                displayMessage: verificationMessages["SUCCESS"].dispalyMessage,
                buttonMessage: verificationMessages["SUCCESS"].buttonMessage,
                buttonState: "SUCCESS",
                onClick: () => {
                    onSuccessFn(verificationResponse)
                }
            }
        }
        else {
            return {
                displayMessage: verificationMessages["LOADING"].dispalyMessage,
                buttonMessage: verificationMessages['LOADING'].buttonMessage,
                buttonState: "LOADING",
                buttonDisabled: true
            }
        }
    }
    useEffect(() => {  
        const updateVerificationState=async()=>{
            const verificationResponse =await queryFn()
            console.log("from use effect");
            
console.log(verificationResponse);

            setVerificationResponse(verificationResponse)
        }
        updateVerificationState()      
    }, [queryFn])
    return (
        <VerificationView props={getVerifyProps()}></VerificationView>
    )
}

export default VerificationProcess
