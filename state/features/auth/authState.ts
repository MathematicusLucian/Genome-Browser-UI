import { baseApi } from "@/state/base/baseState";
import { tagType } from "../../base/tagType";
import refreshTokenApiCall from './refreshTokenApiCall';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { Cookies } from 'react-cookie';

export interface UserType {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: UserType | null;
  tokens: {
    access_token: string | null;
    refresh_token: string | null;
  };
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface responseType {
  accessToken(accessToken: unknown): unknown;
  refreshToken(refreshToken: unknown): unknown;
  data: string;
  meta: FetchBaseQueryMeta | undefined;
}

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

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

const cookies = new Cookies();

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

const initialState: AuthContextType = {
  user: null,
  tokens: {
    access_token: cookies.get('access_token'),
    refresh_token: cookies.get('refresh_token'),
  },
};

const refreshRedditAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshToken: string) => {
    // Replace with your token  
    const newAccessToken = await refreshTokenApiCall(refreshToken);  
    return newAccessToken;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<AuthResponse | null>) => {
      if (null === action.payload) return;
      state.tokens.access_token = action.payload.access_token;
      state.tokens.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      state.user = null;
      state.tokens.access_token = null;
      state.tokens.refresh_token = null;
      cookies.remove('access_token');
      cookies.remove('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshRedditAccessToken.fulfilled, (state, action) => {
      if (action.payload === null) return;
      state.tokens.access_token = action.payload.access_token;
      state.tokens.refresh_token = action.payload.refresh_token;
    });
  },
});

export { refreshRedditAccessToken };

export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;