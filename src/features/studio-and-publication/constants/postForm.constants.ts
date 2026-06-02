import { CONTENT_TYPE } from "@/constants/app.constants";
import { IFormField } from "@/types/props.types";

export const POST_FORM_FIELDS: Omit<IFormField, "errors" | "control">[] = [
    {
        name: "title",
        label: "Post Title",
        type: "text",
        autoFocus: false,
        placeholder: "Your post title"
    },
    {
        name: "description",
        label: "Post Description",
        type: "textAreaAutoSize",
        placeholder: "Something about your post..."
    },
    {
        name: "contentType",
        label: "Content Type",
        type: "select",
        placeholder: "Select Content Type",
        selectList: CONTENT_TYPE
    },
]