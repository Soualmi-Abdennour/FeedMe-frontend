import { LucideIcon } from "lucide-react";
import { UserResponse } from "./api.types";
import { WeekDay } from "./app.types";

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
        |"textArea"
        | "time";
    selectList?:readonly {
        label:string;
        key:string
        value:string
    }[]
    errors: any,
    control: any
}

export interface IWorkingDayFormField {
    day:WeekDay,
    from: Omit<IFormField, "errors" | "control">
    to: Omit<IFormField, "errors" | "control">
    disabled?:boolean
    errors:any
    control:any
} 
export interface ISubmitButton {
    disabled?:boolean;
    children:React.ReactNode
    state?:"LOADING"|"FAIL"|"ERROR"|"SUCCESS" | "DEFAULT" ;
    className?:string;
    variant?: "primary" | "secondary" | "tertiary" | "success" | "fail" | "error" | "ghost"
    onClick?:()=>void
}


export type VerificationState = "LOADING" | "ERROR" | "FAIL" | "SUCCESS" | "DEFAULT"

export interface IVerificationProcessProps {
    verificationMessages:VerificationProcessState;
    onSuccessFn: (verificationResponse:UserResponse) => void | Promise<UserResponse>;
    onFailFn: (verificationResponse?:UserResponse) => void | Promise<UserResponse>;
    onErrorFn: (verificationResponse?: UserResponse) => void | Promise<UserResponse>;
    queryFn:()=>Promise<UserResponse>
}
export interface IVerificationViewProps {
    title?: string,
    displayMessage: string ,
    buttonMessage?: string,
    onClick?: () => void,
    buttonState?: VerificationState,
    buttonDisabled?: boolean,
    imageUrl?:string
}
export interface IDefaultVerificationProcessProps extends IVerificationViewProps {
    resendVerificationEndpoint?: string
}

export type VerificationProcessState = {
    [key in VerificationState]: {
        dispalyMessage: string;
        buttonMessage: string;
    }
}


export interface IAppNavItemProps {
    path: string
    label: string
    icon?: LucideIcon
    isActive: boolean
}

export interface IAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

export interface IIconProps {
    name: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'black' | 'gray' | 'orange' | 'white';
    className?: string;
}

export interface ISuccessToastProps {
    message?: string;
    visible: boolean;
    onDismiss?: () => void;
    duration?: number;
}

export interface IToast {
    message: string;
    visible: boolean;
    onHide: () => void;
    duration?: number;
}