import { tagType } from "../../base/tagType";
import { baseApi } from "../../base/baseState";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
      providesTags: [tagType.profile],
    }),
    updateProfilePicture: build.mutation({
      query: (data) => ({
        url: "/profile/image",
        method: "PATCH",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagType.profile],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagType.profile],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfilePictureMutation,
  useUpdateProfileMutation,
} = profileApi;