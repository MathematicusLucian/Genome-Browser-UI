import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/state/base/baseQuery';

export const snpResearchApi = createApi({
  reducerPath: 'snpResearchApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://127.0.0.1:8000/',
    }),
  endpoints: (builder) => ({
    // getSnpDataByRsid: builder.query({
    //   query: (rsids = [1]) => `snp_research?_rsids=${rsids}&_limit=10`,
    // }),
    postSnpDataByRsid: builder.query({ // mutation
        query: (rsids: string[]) => {
          const q = ({
            url: "snp_research/",
            method: "post",
            data: JSON.stringify(rsids),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
          });
          console.log('q', q.data);
          return q;
        }
    }),
  }),
});

export const { usePostSnpDataByRsidQuery } = snpResearchApi;