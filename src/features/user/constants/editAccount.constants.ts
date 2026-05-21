import { IFormField } from "@/types/props.types"

export const EDIT_ACCOUNT_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "userName",
        label: "Username",
        type: "text",
        placeholder: "Enter your new username",
    },
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter your new email",
    },
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
        name: "newPasswordConfirm",
        label: "Confirm New Password",
        type: "password",
        placeholder: "Confirm your new password",
    },
]