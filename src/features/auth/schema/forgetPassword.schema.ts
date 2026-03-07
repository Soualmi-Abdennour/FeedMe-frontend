import { z } from "zod";

export const forgetPasswordFormSchema=z.object({
    // can be email or userName 
    email: z.string()
        .email("Invalid Email"),
    // z.union([
    //     z.string()
    //     .min(3, 'Username must be at least 3 characters')
    //     .max(30, 'Username must not exceed 30 characters')
    //     .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
    //     z.string()
    //     .email("Invalid Email"),]),
})

export type IForgetPasswordForm = z.infer<typeof forgetPasswordFormSchema>
