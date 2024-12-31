import axiosInstance from "../state/base/axiosInstance";
import setAccessToken from "../auth/setAccessToken";
import { storeUserInfo } from "./Auth";
import { BASE_URL } from "../constant";
import { jwtDecode } from "jwt-decode";

const userLogin = async (payload) => {
  const urlParams = new URLSearchParams(window?.location?.search);
  const existingRedirectURL = urlParams.get("next");

  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/auth/login`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );

    const { accessToken, need_password_change } = response?.data || {};

    if (accessToken) {
      const { role }: any = jwtDecode(accessToken);
      if (role === "CUSTOMER") {
        throw new Error("You are not allowed to access this page");
      }

      storeUserInfo(accessToken);
      await setAccessToken(accessToken, {
        need_password_change,
        redirect: existingRedirectURL
          ? existingRedirectURL
          : `/${role === "SUPER_ADMIN" ? "super-admin" : role.toLowerCase()}/dashboard`,
      });
      window.location.reload();
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export default userLogin;