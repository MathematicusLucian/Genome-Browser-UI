
"use server";
import { cookies } from "next/headers";
import { AUTH_TOKEN_KEY } from "../constant";

const removeAccessToken = async () => {
  (await cookies()).delete(AUTH_TOKEN_KEY);
};

export default removeAccessToken;
