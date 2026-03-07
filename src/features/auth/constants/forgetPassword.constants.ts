import { IFormField } from "@/types/props.types";

export const FORGET_PASSWORD_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
        autoFocus: true,
        placeholder: "xxxxxxxxxxx@gmail.com"
    },
]