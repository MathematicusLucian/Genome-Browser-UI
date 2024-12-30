import { baseApi } from "@/state/base/baseState";
import { tagType } from "../../base/tagType";

const tagAuth:string = tagType.auth;
 
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
      // providesTags: [tagAuth],
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;