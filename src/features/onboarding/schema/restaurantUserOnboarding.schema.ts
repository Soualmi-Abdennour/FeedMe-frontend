import { z } from "zod";
import { ALGERIA_STATES } from "@/constants/app.constants";

export const restaurantOnboardingFormSchema = z.object({
    restaurantName: z
        .string()
        .min(2, "Restaurant name must be at least 2 characters")
        .max(100, "Restaurant name is too long"),

    businessEmail: z
        .string()
        .email("Invalid email address")
        .optional(),
        // .or(z.literal("")),

    phoneNumber: z
        .string()
        .regex(/^(0)(5|6|7)[0-9]{8}$/, "Invalid Algerian phone number"),

    city: z
        .enum(ALGERIA_STATES.map(state => state.value) as [string, ...string[]], {
            errorMap: () => ({ message: "Please select a valid city" }),
        }),

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
        .url("Must be a valid URL")
});
export type IRestaurantOnboardingForm = z.infer<
    typeof restaurantOnboardingFormSchema
>;