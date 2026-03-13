
export interface IFormField {
    name: string;
    label?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    id?: string
    type?:
        |"text"
        |"password"
        |"select"
        |"textArea";
    selectList?:readonly {
        key:string;
        value:string
    }[]
    errors: any,
    control: any
}

export interface ISubmitButton {
    disabled?:boolean;
    children:React.ReactNode
    state?:"LOADING"|"FAIL"|"ERROR"|"SUCCESS" | "DEFAULT" ;
    className?:string;
    onClick?:()=>void
}


export type VerificationState = "LOADING" | "ERROR" | "FAIL" | "SUCCESS" | "DEFAULT"

export interface IVerificationProps {
    displayMessage: string ,
    buttonMessage?: string,
    onClick?: () => void,
    buttonState?: VerificationState,
    buttonDisabled?: boolean,
    resendVerificationEndpoint?: string
}

export type VerificationProcessState = {
    [key in VerificationState]: {
        dispalyMessage: string;
        buttonMessage: string;
        redirectTo?: string;
    }
}