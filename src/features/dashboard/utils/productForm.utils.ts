import { ProductFrom } from "../types/product.types";

export function buildProductForm({ payload }: { payload: ProductFrom }):FormData {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", String(payload.price));
    formData.append("description", payload.description);
    formData.append("preparationTime", String(payload.preparationTime));
    formData.append("category", JSON.stringify([payload.category]));
    formData.append("image", payload.image);
    return formData
}