import { ALGERIA_STATES, KITCHEN_CATEGORY, USAGE_GOAL, WEEK_DAYS } from "@/constants/app.constants";
import { z } from "zod";

export const normalUserOnboardingFormSchema=z.object({
    fullName: z.string()
        .min(3, 'Full Name must be at least 5 characters')
        .max(80, 'Full Name must not exceed 80 characters'),
    city: z.enum(
        ALGERIA_STATES.map(state => state.value) as [string, ...string[]],
    ).optional(),
    phoneNumber: z.string().regex(/^(0)(5|6|7)[0-9]{8}$/, "Invalid Algerian phone number"),
    bio: z.string().max(500, "You have only 500 character").optional(),
    // usageGoal: z.enum(
    //     USAGE_GOAL.map(day => day.value) as [string, ...string[]]
    // ).optional(),
    // kitchenCategory:z.enum(
    //     KITCHEN_CATEGORY.map(day => day.value) as [string, ...string[]]
    // ).optional()
})

export type INormalUserOnboardingForm = z.infer<typeof normalUserOnboardingFormSchema>