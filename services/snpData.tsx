import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError, AxiosHeaders } from 'axios';
import { IPatientGenomeVariant, ISnpPairsResearch } from '../models/database'; 

interface AxiosBaseQueryArgs {
  baseUrl: string;
  prepareHeaders?: (headers: AxiosHeaders, api: any) => AxiosHeaders;
}

interface AxiosBaseQueryParams {
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: any;
  params?: Record<string, any>;
  [key: string]: any;
}

export const axiosBaseQuery =
  ({ baseUrl }: AxiosBaseQueryArgs): BaseQueryFn<AxiosBaseQueryParams> => 
  async ({ url, method, body: data, params, ...rest }, api) => {
    try {
      const result = await axios({
        url,
        baseURL: baseUrl,
        method,
        data,
        params,
        ...rest,
        signal: api.signal,
      });

      return {
        data: result.data,
        meta: {
          headers: result.headers,
          status: result.status,
          config: result.config,
          request: result.request,
        },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          headers: err.response?.headers,
        },
      };
    }
};

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