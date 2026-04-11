import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/base.store';
import type { GetProductsParams, ProductsResponse } from '../types/shop.types';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => { //pour ajouter le token f headers dyal request (authorization)
      const token = (getState() as RootState).authentication?.authentication?.jwtToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({ // hada howa req li ghadi n3ayto 3lih f component باش تجيب المنتجات
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: ({ category, sortBy, cursor }) => ({
        url: '/products', // endpoint dyal backend li ghadi tjib l products
        params: { //params li naba3teh fl req 
          ...(category && category !== 'all' && { category }),
          ...(sortBy && { sortBy }),
          ...(cursor && { cursor }), // هنا بدل page
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = shopApi;