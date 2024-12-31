import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
// import { AUTH_TOKEN_KEY } from "./utils/constant";
const AUTH_TOKEN_KEY = '';
const AuthRoutes = ["/login"];
const commonPrivateRoutes = ["/change-password", "/profile"];
const roleBasedPrivateRoutes = {
  SUPER_ADMIN: [/^\/super-admin/],
};
const allowedOrigins = [
    'http://localhost:3000', 
  ];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // -------
  // COOKIES
  // -------
  // Access cookies from the request headers
  const cookieStore = cookies();

  // ----------------
  // CURRENT RESPONSE
  // ----------------
  // Retrieve the current response
  let res = null;
  // const res = NextResponse.next()

  // ------------
  // ACCESS TOKEN
  // ------------
  const accessToken = cookieStore.get(AUTH_TOKEN_KEY)?.value;
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      res = NextResponse.next(); // Allow access to login or register
    }
    res = NextResponse.redirect(
      new URL(
        `/login?next=${pathname.startsWith("/") ? `${pathname.slice(1)}` : pathname}`,
        request.url,
      ),
    ); // Redirect to login if no token and accessing private route
  }
  // JWT token
  let decodedData;
  try {
    decodedData = jwtDecode(accessToken);
  } catch (error) {
    res = NextResponse.redirect(new URL("/login", request.url)); // Invalid token, force login
  }
  const role = decodedData?.role;
  if (AuthRoutes.includes(pathname)) { 
    // Prevent loop where valid token (and user is attempting to load 'login' page) :. load /login
    // Otherwise, the user is deemed to be logged in
    if (pathname === "/login") {
      res = NextResponse.redirect(
        new URL(
          `/${role === "SUPER_ADMIN" ? "super-admin" : role.toLowerCase()}/dashboard`,
          request.url,
        ),
      );
    }
  }

  // --------------
  // PRIVATE ROUTES
  // --------------
  if (commonPrivateRoutes.includes(pathname)) {
    res = NextResponse.next();
  }
  if (role && roleBasedPrivateRoutes[role]) { // Role-based routing for private routes
    const allowedRoutes = roleBasedPrivateRoutes[role];
  // Check if the current path matches any of the allowed role routes
    if (allowedRoutes.some((route) => route.test(pathname))) {
      res = NextResponse.next();
    } else {
      res = NextResponse.redirect(new URL("/logout", request.url)); // Role mismatch, log the user out
    }
  }
  // Default redirect if none of the conditions match
  res = NextResponse.redirect(new URL("/", request.url));

  // ----
  // CORS
  // ----
  // Add CORS headers to the response
  // Retrieve the HTTP "Origin" header from the incoming request
  request.headers.get("origin")
  // If the origin is an allowed one, add it to the 'Access-Control-Allow-Origin' header
  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
  }
  // res.headers.append('Access-Control-Allow-Origin', '*') // replace with actual origin    
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res;
}

// Path regex to apply the middleware to
export const config = {
    matcher: ['/api/:path*', "/login", "/super-admin/:path*"]
};