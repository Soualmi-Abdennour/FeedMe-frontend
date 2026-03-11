import { ALGERIA_STATES } from "@/constants/app.constants";
import { IFormField } from "@/types/props.types";

export const NORMAL_USER_ONBOARDING_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        autoFocus: true,
        placeholder: "John Martin"
    },
    {
        name: "city",
        label: "City (Optional)",
        type: "select",
        autoFocus: false,
        placeholder: "Select a city",
        selectList:ALGERIA_STATES
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
        type: "text",
        autoFocus: false,
        placeholder: "0123456789"
    },
    {
        name: "bio",
        label: "Bio (Optional)",
        type: "textArea",
        autoFocus: false,
        placeholder: "something..."
    },
]