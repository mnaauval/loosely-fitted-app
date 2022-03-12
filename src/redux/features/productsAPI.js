import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allProductsApi = createApi({
  name: "allProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products/",
    }),
  }),
});

export const { useGetAllProductsQuery } = allProductsApi;
