import { IFormField } from "@/types/props.types";

export const RESET_PASSWORD_FIELDS: Omit<IFormField, "errors" | "control">[] = [
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