import React from 'react'
import { IVerifyEmailMessageState } from '../../types/props.types'


function VerifyEmailTokenMessage({state}:{state:IVerifyEmailMessageState}) {
    const getMessageByState=()=>{
        if(state==="LOADING")
            return "Verifying your email ..."
        if (state==="SUCCESS")
            return "Email verified successfully."
        if(state==="ERROR") 
            return "Something went wrong, please try again."
    }
    return (
        <h1>
            {getMessageByState()}
        </h1>
    )
}

export default VerifyEmailTokenMessage
