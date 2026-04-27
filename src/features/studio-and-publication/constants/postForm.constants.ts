import { IFormField } from "@/types/props.types";

export const POST_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        autoFocus: false,
        placeholder: "Your post title"
    },
    {
        name: "description",
        label: "Description",
        type: "textArea",
        placeholder: "Something about your post..."
    },
    {
        name: "contentType",
        label: "Content Type",
        type: "select",
        placeholder: "Select Content Type",
        selectList: [{ value: "RECIPE", label: "Recipe" }, { value: "DISH", label: "Dish" }]
    },
]