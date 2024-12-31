"use server"; 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_TOKEN_KEY } from "../constant";

const setAccessToken = async (token, option) => {
  (await cookies()).set(AUTH_TOKEN_KEY, token);
  if (option && option.need_password_change) {
    redirect("/change-password");
  }
  if (option && !option.need_password_change && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;