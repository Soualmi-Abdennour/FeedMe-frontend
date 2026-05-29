import { z } from "zod";

export const postFormSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters"),

    description: z
        .string()
        .min(50, "Description must be at least 50 characters")
        .max(5000, "Description must be at most 5000 characters"),
    contentType:z.enum(
            ["RECIPE","DISH"]
        ),
});
export type IPostFormSchema = z.infer<typeof postFormSchema>