import { z } from "zod"

export const editAccountSchema = z
    .object({
        userName: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must be at most 30 characters"),
        email: z
            .string()
            .email("Please enter a valid email address"),
        currentPassword: z.string().optional(),
        newPassword: z.string().optional(),
        newPasswordConfirm: z.string().optional(),
    })

    .refine(
        (data) => {
            const anyFilled = data.currentPassword || data.newPassword || data.newPasswordConfirm
            if (!anyFilled) return true
            return !!data.currentPassword && !!data.newPassword && !!data.newPasswordConfirm
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
            if (!data.newPassword && !data.newPasswordConfirm) return true
            return data.newPassword === data.newPasswordConfirm
        },
        {
            message: "Passwords do not match",
            path: ["newPasswordConfirm"],
        }
    )

export type EditAccountFormValues = z.infer<typeof editAccountSchema>