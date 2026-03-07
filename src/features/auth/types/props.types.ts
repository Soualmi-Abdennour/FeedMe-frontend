
export type VerificationState = "LOADING" | "ERROR"  | "FAIL" | "SUCCESS" |"DEFAULT"

export interface IVerifyTokenFormProps {
    displayMessage: React.ReactNode,
    buttonMessage?: string,
    onClick?: () => void,
    buttonState?: VerificationState,
    buttonDisabled?:boolean
}

export type VerificationProcessState = {
    [key in VerificationState]: {
        dispalyMessage: string;
        buttonMessage: string;
    }
}