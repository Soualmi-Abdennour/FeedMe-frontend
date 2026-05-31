import { KITCHEN_CATEGORY } from "@/constants/app.constants";
import { z } from "zod";

export const productFormSchema = z.object({
    name: z
        .string()
        .min(3, "Product Name must be at least 3 characters")
        .max(100, "Product Name be at most 100 characters"),
    preparationTime:z
    .number()
    .min(5, "Preparation time can't be less then 5 min")
    .max(600, "Preparation time can't be more then 10 hours"),
    description: z
        .string()
        .min(50, "Description must be at least 50 characters")
        .max(5000, "Description must be at most 5000 characters"),
    price: z
        .number()
        .min(100, "Price can't be less then 100 DA")
        .max(10000, "Preparation time can't be more then 10000 DA"),
    category:z.enum(
        ["Vegetarian", "Fast Food", "Deserts & Sweets", "Seafood", "Healthy Food", "Traditional dishes"]
        ),
});
export type IProductFormSchema = z.infer<typeof productFormSchema>