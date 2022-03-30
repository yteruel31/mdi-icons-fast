import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { IconDto } from "./dtos/icon.dto";
import { Pagination } from "./dtos/pagination";

export const iconsApi = createApi({
  reducerPath: "iconsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    searchIcons: build.query<Pagination<IconDto>, Record<string, any>>({
      query: (arg) => ({
        url: "/icons",
        params: arg,
      }),
    }),
  }),
});

export const { useSearchIconsQuery } = iconsApi;
