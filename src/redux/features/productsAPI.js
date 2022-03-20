import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allProductsApi = createApi({
  name: "allProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://loofi-shop.herokuapp.com/api/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products/",
    }),
    getProductsCategory: builder.query({
      query: (category) => `products?category=${category}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductsCategoryQuery } = allProductsApi;
