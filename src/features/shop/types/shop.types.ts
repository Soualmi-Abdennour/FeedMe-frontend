export interface SellerModel {
  id: string;
  userName: string;
  avatarUrl?: string ;
}

export type ProductAppModel = {
  id: string;
  name: string;
  price: number;
  imageUrl: string ;
  category: "Vegetarian"|"Fast Food"| "Deserts & Sweets"| "Seafood"| "Healthy Food"| "Traditional dishes"
  seller: SellerModel;
  quantityAvailable: number;
  description: string;
  preparingTime: number;
}

export type ProductDbModel ={
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  preparingTime: number;
  category: ("Vegetarian" | "Fast Food" | "Deserts & Sweets" | "Seafood" | "Healthy Food" | "Traditional dishes")[];
  restaurant?: {
    id: string;
    restaurantName: string;
    restaurantLogoUrl?: string ;
    User?: {
      userName: string;
    };
  };
}






