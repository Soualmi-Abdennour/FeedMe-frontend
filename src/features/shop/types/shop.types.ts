export interface SellerModel {
  id: string;
  username: string;
  avatarUrl?: string ;
}

export type ProductAppModel = {
  id: string;
  name: string;
  price: number;
  imageUrl: string ;
  category: string;
  seller: SellerModel;
  quantityAvailable: number;
  ///rating?: number;
  description?: string;
  preparationTime?: number;
}

export type ProductDbModel ={
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  preparingTime: number;
  category: string | string[];
  restaurant?: {
    id: string;
    restaurantName: string;
    restaurantLogoUrl?: string ;
    User?: {
      userName: string;
    };
  };
}




/**params → variable li ghadi tdir request l API باش تجيب المنتجات
category: "food" → كنقولو لل backend: “جيب ليا غير المنتجات ديال الكاتيجوري food”
sortBy: "random" → كنقولو: “sorti المنتجات بطريقة عشوائية” (random) */

