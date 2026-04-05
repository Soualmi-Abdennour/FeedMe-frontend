import { ALGERIA_STATES } from "@/constants/app.constants";
import { TimeString, WeekDay, Wilaya } from "@/types/app.types";
import { z } from "zod";

export const restaurantEditBasicInfoFormSchema = z.object({
    restaurantName: z
        .string()
        .min(2, "Restaurant name must be at least 2 characters")
        .max(100, "Restaurant name is too long").optional(),

    businessEmail: z
        .string()
        .email("Invalid email address")
        .optional(),
    // .or(z.literal("")),

    phoneNumber: z
        .string()
        .regex(/^(0)(5|6|7)[0-9]{8}$/, "Invalid Algerian phone number").optional(),
    bio: z.string().max(500, "You have only 500 character").optional()

});
export const restaurantEditLocationFormSchema = z.object({
    city: z
        .enum(ALGERIA_STATES.map(state => state.value) as [Wilaya, ...Wilaya[]], {
            errorMap: () => ({ message: "Please select a valid city" }),
        }).optional(),

    street: z
        .string()
        .max(150, "Street name too long")
        .optional(),
    // .or(z.literal("")),

    postalCode: z
        .string()
        .regex(/^[0-9]{5}$/, "Postal code must be 5 digits")
        .optional()
        .or(z.literal("")),

    googleMapsLink: z
        .string()
        .url("Must be a valid URL").optional()
});
export type IRestaurantEditBasicInfoForm = z.infer<
    typeof restaurantEditBasicInfoFormSchema
>;
export type IRestaurantEditLocationInfoForm = z.infer<
    typeof restaurantEditLocationFormSchema
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
            // One empty, one filled → invalid
            if (data?.from === "" || data?.to === "") return false;
            return true;
        },
        { message: "Please fill both fields" })
    .refine(
        (data) => {
            // Only validate order if both are filled
            if (!data) return true;
            return data.from < data.to;
        },
        { message: "End time must be after start time" }
    );
    
export const restaurantWorkingDaysFormSchema = z.object({
    Sunday: workingDaySchema,
    Monday: workingDaySchema,
    Tuesday: workingDaySchema,
    Wednesday: workingDaySchema,
    Thursday: workingDaySchema,
    Friday: workingDaySchema,
    Saturday: workingDaySchema,
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