import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { IPatientGenomeVariant, ISnpPairsResearch } from '../models/database'; 
import { axiosBaseQuery } from '@/state/base/baseQuery';

export const snpResearchaApi = createApi({
    reducerPath: 'snpResearchaApi',
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

// export const {useGetSnpDataByRsidQuery} = snpResearchaApi;
export const {usePostSnpDataByRsidQuery} = snpResearchaApi;