// import { axiosBaseQuery } from "@/state/base/baseQuery"; 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const snpResearchApi = createApi({
  reducerPath: 'snpResearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  //     baseQuery: axiosBaseQuery({
  //         baseUrl: 'http://127.0.0.1:8000/',
  //     }),
  endpoints: (builder) => ({
    // getSnpDataByRsid: builder.query({
    //   query: (rsids = [1]) => `snp_research?_rsids=${rsids}&_limit=10`,
    // }),
    postSnpDataByRsid: builder.query({ // mutation
        query: (rsids: string[]) =>  ({
            url: "snp_research",
            method: "post",
            data: rsids,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }),
    }),
  }),
});

export const { usePostSnpDataByRsidQuery } = snpResearchApi;