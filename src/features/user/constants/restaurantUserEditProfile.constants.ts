import { ALGERIA_STATES } from "@/constants/app.constants";
import { IFormField, IWorkingDayFormField } from "@/types/props.types";

export const EDIT_RESTAURANT_USER_BASIC_INFORMATION_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
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
]
export const EDIT_RESTAURANT_USER_LOCATION_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "city",
        label: "City",
        type: "select",
        autoFocus: true,
        placeholder: "Sidi Bel Abbès",
        selectList: ALGERIA_STATES
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

export const EDIT_RESTAURANT_USER_WORKING_DAYS_FORM: Omit<IWorkingDayFormField,"errors"|"control">[] = [
    {
        day: "Sunday",
        from: {
            name: "Sunday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Sunday.to",
            type: "time",
            placeholder: "20:00"
        }
    },
    {
        day: "Monday",
        from: {
            name: "Monday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Monday.to",
            type: "time",
            placeholder: "20:00"
        }
    },
    {
        day: "Tuesday",
        from: {
            name: "Tuesday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Tuesday.to",
            type: "time",
            placeholder: "20:00"
        }
    },
    {
        day: "Wednesday",
        from: {
            name: "Wednesday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Wednesday.to",
            type: "time",
            placeholder: "20:00"
        }
    },
    {
        day: "Thursday",
        from: {
            name: "Thursday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Thursday.to",
            type: "time",
            placeholder: "20:00"
        }
    },
    {
        day: "Friday",
        from: {
            name: "Friday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Friday.to",
            type: "time",
            placeholder: "20:00"
        }
    },
    {
        day: "Saturday",
        from: {
            name: "Saturday.from",
            type: "time",
            placeholder: "08:00"
        },
        to: {
            name: "Saturday.to",
            type: "time",
            placeholder: "20:00"
        }
    }
];