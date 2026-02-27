import { IEmailVerificationState, IVerifyEmailMessageState } from "../../types/props.types"
import VerifyEmailMessage from "../molecules/VerifyEmailTokenMessage"
import VerifyEmailSubmitButton from "../molecules/VerifyEmailTokenSubmitButton"

function VerifyEmailTokenUI({ isSuccess, isError, isLoading }:IEmailVerificationState) {
    // we use the IVerifyEmailMessage state because the button states >= message states
    const getVerificationState = (): { state:IVerifyEmailMessageState } =>{
        if(isError)
            return {state:"ERROR"}
        if(isSuccess)
            return {state:"SUCCESS"} 
        // the default in our case is the loading 
        return { state: "LOADING" }
    }

    const {state}=getVerificationState()
    return (
        <div>
            <VerifyEmailMessage state={state}></VerifyEmailMessage>
            <VerifyEmailSubmitButton state={state}></VerifyEmailSubmitButton>
        </div>
    )
}

export default VerifyEmailTokenUI
