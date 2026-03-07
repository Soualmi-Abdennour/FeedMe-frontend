import { z } from "zod";

export const signinFormSchema=z.object({
    // can be email or userName 
    identifier: z.union([
        z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
        z.string()
        .email("Invalid Email"),]),

        password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*()_+\[\]{};':"\\|,.<>/?`~\-=]/, 'Password must contain at least one special character'),
})

export type ISigninForm= z.infer<typeof signinFormSchema>