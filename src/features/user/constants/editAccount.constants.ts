import { IFormField } from "@/types/props.types"

export const EDIT_ACCOUNT_USERNAME_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter your new username",
    },
]

export const EDIT_ACCOUNT_EMAIL_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter your new email",
    },
]

export const EDIT_ACCOUNT_PASSWORD_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "currentPassword",
        label: "Current Password",
        type: "password",
        placeholder: "Enter your current password",
    },
    {
        name: "newPassword",
        label: "New Password",
        type: "password",
        placeholder: "Enter your new password",
    },
    {
        name: "confirmPassword",
        label: "Confirm New Password",
        type: "password",
        placeholder: "Confirm your new password",
    },
]