import { z } from "zod";

export const resetPasswordFormSchema=z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*()_+\[\]{};':"\\|,.<>/?`~\-=]/, 'Password must contain at least one special character'),
    passwordConfirm:z.string()
}).refine((data) => data.password === data.passwordConfirm,{
    message: "Passwords don't match",
    path: ["passwordConfirm"]
})

export type IResetPasswordForm = z.infer<typeof resetPasswordFormSchema>