
export type VerificationState = "LOADING" | "ERROR"  | "FAIL" | "SUCCESS" |"DEFAULT"

export interface IVerifyTokenFormProps {
    displayMessage:string | string[],
    buttonMessage?: string,
    onClick?: () => void,
    buttonState?: VerificationState,
    buttonDisabled?:boolean,
    resendVerificationEndpoint?:string
}

export type VerificationProcessState = {
    [key in VerificationState]: {
        dispalyMessage: string|string[];
        buttonMessage: string;
        redirectTo?:string;
    }
}