import { IFormField } from "@/types/props.types";

export const SIGN_IN_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "identifier",
        label: "Username/Email",
        type: "text",
        autoFocus: true,
        placeholder: "xxxxxxxxxxx"
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        autoFocus: false,
        placeholder: "min. 8 characters"
    },
]