import { IFormField } from "@/types/props.types";

export const SIGN_UP_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "userName",
        label: "Username",
        type: "text",
        autoFocus: true,
        placeholder: "xxxxxxxxxxx"
    },
    {
        name: "email",
        label: "Your email address",
        type: "text",
        autoFocus: false,
        placeholder: "xxxxxx@gmail.com"
    },
    {
        name: "password",
        label: "Choose a password",
        type: "password",
        autoFocus: false,
        placeholder: "min. 8 characters"
    },
    {
        name: "passwordConfirm",
        label: "Password again",
        type: "password",
        autoFocus: false,
        placeholder: "min. 8 characters"
    },
]