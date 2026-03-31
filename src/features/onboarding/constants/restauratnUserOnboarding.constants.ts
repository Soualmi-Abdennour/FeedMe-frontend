import { ALGERIA_STATES } from "@/constants/app.constants";
import { IFormField } from "@/types/props.types";

export const RESTAURANT_USER_ONBOARDING_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "restaurantName",
        label: "Restaurant Name",
        type: "text",
        autoFocus: true,
        placeholder: "xxxxxxxxxx"
    },
    {
        name: "businessEmail",
        label: "BusinessEmail (Optional)",
        type: "text",
        autoFocus: false,
        placeholder: "xxxxxx@gmail.com",
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
        type: "text",
        autoFocus: false,
        placeholder: "0123456789"
    },
    {
        name: "city",
        label: "City",
        type: "select",
        autoFocus: true,
        placeholder: "Sidi Bel Abbès",
        selectList:ALGERIA_STATES
    },
    {
        name: "street",
        label: "Street(Optional)",
        type: "text",
        autoFocus: false,
        placeholder: "xxxxxxxx",
    },
    {
        name: "postalCode",
        label: "Postal Code(Optional)",
        type: "text",
        autoFocus: false,
        placeholder: "00000",
    },
    {
        name: "googleMapsLink",
        label: "Google Maps Link",
        type: "text",
        autoFocus: false,
        placeholder: "xxxxxxxx",
    },
]