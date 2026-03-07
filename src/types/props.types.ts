
export interface IFormField {
    name: string;
    label?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    id?: string
    type?:
        "text"|
        "password";
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
