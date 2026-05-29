import { z } from "zod";
import { ALGERIA_STATES,WEEK_DAYS} from "@/constants/app.constants";
import { TimeString, WeekDay, Wilaya } from "@/types/app.types";


export const restaurantOnboardingFormSchema = z.object({
    restaurantName: z
        .string()
        .min(2, "Restaurant name must be at least 2 characters")
        .max(100, "Restaurant name is too long"),

    businessEmail: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),

    phoneNumber: z
        .string()
        .regex(/^(0)(5|6|7)[0-9]{8}$/, "Invalid Algerian phone number"),

    city: z
        .enum(ALGERIA_STATES.map(state => state.value) as [Wilaya, ...Wilaya[]], {
            errorMap: () => ({ message: "Please select a valid city" }),
        }),

    street: z
        .string()
        .max(150, "Street name too long")
        .optional()
        .or(z.literal("")),

    postalCode: z
        .string()
        .regex(/^[0-9]{5}$/, "Postal code must be 5 digits")
        .optional()
        .or(z.literal("")),

    googleMapsLink: z
        .string()
        .url("Must be a valid URL")
});
export type IRestaurantOnboardingForm = z.infer<
    typeof restaurantOnboardingFormSchema
>;


export const timeStringSchema = z.custom<TimeString>(
    (val) => {
        if (val === "") return true; // allow empty string
        return typeof val === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(val);
    },
    {
        message: "Time must be in HH:mm format or empty",
    }
)


const workingDaySchema = z
    .object({
        from: timeStringSchema,
        to: timeStringSchema,
    }).optional()
    .refine(
        (data) => {
            if (!data) return true
            if (data?.to === "" && data.from === "") return false
            if (data?.from === "" || data?.to === "") return false
            return true  // ← missing, both are filled so pass to next refine
        },
        { message: "Please fill both fields" }
    )
    .refine(
        (data) => {
            if (data?.to === "" && data.from === "") return true
            return data?.from! < data?.to!
        },
        { message: "End time must be after start time" }
    )

export const restaurantWorkingDaysFormSchema = z.object({
    Sunday: workingDaySchema.optional(),
    Monday: workingDaySchema.optional(),
    Tuesday: workingDaySchema.optional(),
    Wednesday: workingDaySchema.optional(),
    Thursday: workingDaySchema.optional(),
    Friday: workingDaySchema.optional(),
    Saturday: workingDaySchema.optional(),
}).transform(data =>
    Object.entries(data).map(([day, times]) => {
        const weekDay = day as WeekDay
        return { day: weekDay, ...times }
    })
)
export type IRestaurantWorkingDaysFormInput = z.input<typeof restaurantWorkingDaysFormSchema>;
// use this for useForm<T> and defaultValues

export type IRestaurantWorkingDaysFormOutput = z.output<typeof restaurantWorkingDaysFormSchema>;
// use this for your onSubmit handler