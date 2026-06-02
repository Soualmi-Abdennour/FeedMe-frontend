import { KITCHEN_CATEGORY } from "@/constants/app.constants"; 

export type ProductCategory = typeof KITCHEN_CATEGORY[number]["key"];


export type ProductFrom ={
    name: string;
    price: number;
    description: string;
    preparingTime: number;
    category: string;
    image: File ;
}
export type ProductImage = {
    imageFile?: File
    previewUrl?: string
}

