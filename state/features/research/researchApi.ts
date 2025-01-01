import { axiosBaseQuery } from "@/state/base/baseQuery";
import { createApi } from "@reduxjs/toolkit/query";

export const snpResearchApi = createApi({
    reducerPath: 'snpResearchApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',
    }),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
    endpoints: (builder: any) => ({
    //   getSnpDataByRsid: builder.query({
    //     query: (rsids: any) => `snp_research/${rsids}`,
    //   }),
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
}) 
export const {usePostSnpDataByRsidQuery} = snpResearchApi;