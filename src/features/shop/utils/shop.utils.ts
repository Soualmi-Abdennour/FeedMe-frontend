import { ProductAppModel, ProductDbModel } from "../types/shop.types";

export function mapProductDbToAppModel(p: ProductDbModel): ProductAppModel {
    return {
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        description: p.description,
        imageUrl: p.image,
        category: Array.isArray(p.category)
            ? p.category[0]?.toLowerCase()
            : p.category?.toLowerCase() ?? "all",
        preparationTime: p.preparingTime,
        quantityAvailable: 0,
      seller: {
    id: p.restaurant?.id ?? "unknown",
    username: p.restaurant?.User?.userName ?? "Seller",  // ← userName pour le Link
    displayName: p.restaurant?.restaurantName ?? p.restaurant?.User?.userName ?? "Seller",  // ← pour l'affichage
    ...(p.restaurant?.restaurantLogoUrl && { avatarUrl: p.restaurant.restaurantLogoUrl }),
},
    };
}