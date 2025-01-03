import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/state/base/baseQuery'
// import type { Post } from './types'

export interface Post {
  rsidsList: number
}

type PostsResponse = Post[]

export const snpResearchApi = createApi({
  reducerPath: 'snpResearchApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // getSnpDataByRsid: builder.query({
    //   query: (rsids = [1]) => `snp_research?_rsids=${rsids}&_limit=10`,
    // }),
    postSnpDataByRsid: builder.query({
      // mutation
      query: (rsids: string[]) => {
        const q = {
          url: 'snp_research/',
          method: 'post',
          data: JSON.stringify(rsids),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
        return q
      },
      // providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    // postSnpDataByRsid: builder.mutation<Post, Partial<Post>>({
    //   // & Pick<Post, 'id'>>({
    //   // mutation{
    //   query(data) {
    //     const { rsidsList, ...body } = data
    //     return {
    //       url: `snp_research/${JSON.stringify(rsidsList)}`,
    //       method: 'PUT',
    //       body,
    //     }
    //   },
    //   // query: (rsids: string[]) => (
    //   //     url: 'snp_research/',
    //   //     method: 'post',
    //   //     data: JSON.stringify(rsids),
    //   //     headers: {
    //   //       'Content-type': 'application/json; charset=UTF-8',
    //   //     },
    //   //   }),
    // }),
    //   // Pick out data and prevent nested properties in a hook or selector
    //   transformResponse: (response: { data: Post }, meta, arg) => response.data,
    //   // Pick out errors and prevent nested properties in a hook or selector
    //   transformErrorResponse: (
    //     response: { status: string | number },
    //     meta,
    //     arg,
    //   ) => response.status,
    //   invalidatesTags: ['Post'],
    //   // onQueryStarted is useful for optimistic updates
    //   // The 2nd parameter is the destructured `MutationLifecycleApi`
    //   async onQueryStarted(
    //     arg,
    //     { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry },
    //   ) {},
    //   // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
    //   async onCacheEntryAdded(
    //     arg,
    //     {
    //       dispatch,
    //       getState,
    //       extra,
    //       requestId,
    //       cacheEntryRemoved,
    //       cacheDataLoaded,
    //       getCacheEntry,
    //     },
    //   ) {},
  }),
})

export const { usePostSnpDataByRsidQuery } = snpResearchApi
// export const { usePostSnpDataByRsidMutation } = snpResearchApi
