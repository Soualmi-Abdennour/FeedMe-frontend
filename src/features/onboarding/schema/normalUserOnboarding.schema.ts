import { ALGERIA_STATES } from "@/constants/app.constants";
import { Wilaya } from "@/types/app.types";
import { z } from "zod";

export const normalUserOnboardingFormSchema=z.object({
    fullName: z.string()
        .min(3, 'Full Name must be at least 5 characters')
        .max(80, 'Full Name must not exceed 80 characters'),
    city: z.enum(
        ALGERIA_STATES.map(state => state.value) as [Wilaya, ...Wilaya[]],
    ).optional(),
    phoneNumber: z.string().regex(/^(0)(5|6|7)[0-9]{8}$/, "Invalid Algerian phone number"),
    bio: z.string().max(500, "You have only 500 character").optional().or(z.literal("")),
})

export type INormalUserOnboardingForm = z.infer<typeof normalUserOnboardingFormSchema>