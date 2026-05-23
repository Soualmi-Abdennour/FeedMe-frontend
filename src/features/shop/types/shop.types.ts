export interface SellerModel {
  id: string;
  username: string;
  avatarUrl: string | null;
}

export interface ProductModel {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string;
  seller: SellerModel;
    quantityAvailable: number;
  ///rating?: number;
  description?: string;
  preparationTime?: number; // in minutes
}

export interface ProductsResponse { //hadi hiya structure ديال response لي غادي تجي من backend ملي نطلبو المنتجات
  data: ProductModel[];
  nextCursor: string | null; // cursor لل batch الجاية
  results: number;           // عدد المنتجات لي رجعو
}


export interface GetProductsParams { // hadi ana nb3tha ll backend باش تجيب المنتجات
  category?: string;
  sortBy?: 'price' | 'random' | 'preparationTime';
  cursor?: string; // ISO date string ديال آخر product ف list
}
/**params → variable li ghadi tdir request l API باش تجيب المنتجات
category: "food" → كنقولو لل backend: “جيب ليا غير المنتجات ديال الكاتيجوري food”
sortBy: "random" → كنقولو: “sorti المنتجات بطريقة عشوائية” (random) */

