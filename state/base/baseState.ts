import { axiosBaseQuery } from '@/state/base/baseQuery';
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagType";
// import { BASE_URL } from "@/utils/constant";

const BASE_URL = 'http://127.0.0.1:8000/';

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});