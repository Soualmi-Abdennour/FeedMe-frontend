import { CONTENT_TYPE, KITCHEN_CATEGORY } from "@/constants/app.constants";
import { IFormField } from "@/types/props.types";

export const PRODUCT_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "name",
        label: "Product Name",
        type: "text",
        autoFocus: false,
        placeholder: "Your product name"
    },
    {
        name: "preparingTime",
        label: "Preparation Time (minutes)",
        type: "number",
        autoFocus: false,
        placeholder: "How much it take to deliver this product"
    },
    {
        name: "description",
        label: "Product Description",
        type: "textArea",
        placeholder: "Tell us about your product"
    },
    {
        name: "price",
        label: "Product Price",
        type: "number",
        placeholder: "How much it cost?"
    },
    {
        name: "category",
        label: "Product Category",
        type: "select",
        placeholder: "Select Product Category",
        selectList: KITCHEN_CATEGORY
    },
]