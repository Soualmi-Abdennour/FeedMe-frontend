import { z } from "zod"

export const editAccountSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must be at most 30 characters"),
        email: z
            .string()
            .email("Please enter a valid email address"),
        currentPassword: z.string().optional(),
        newPassword: z.string().optional(),
        confirmPassword: z.string().optional(),
    })

    .refine(
        (data) => {
            const anyFilled = data.currentPassword || data.newPassword || data.confirmPassword
            if (!anyFilled) return true
            return !!data.currentPassword && !!data.newPassword && !!data.confirmPassword
        },
        {
            message: "Please fill all password fields",
            path: ["currentPassword"],
        }
    )

    .refine(
        (data) => {
            if (!data.currentPassword || !data.newPassword) return true
            return data.currentPassword !== data.newPassword
        },
        {
            message: "New password must be different from current password",
            path: ["newPassword"],
        }
    )

    .refine(
        (data) => {
            if (!data.newPassword && !data.confirmPassword) return true
            return data.newPassword === data.confirmPassword
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    )

export type EditAccountFormValues = z.infer<typeof editAccountSchema>