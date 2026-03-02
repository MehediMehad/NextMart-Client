import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

//  Define TypeScript type for role-based private routes
type Role = keyof typeof roleBasedPrivateRoutes;

//  Define authentication routes (login & register pages)
const authRoutes = ["/login", "/register"];

//  Define role-based allowed private routes
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/], //  Routes accessible by "user" role
  admin: [/^\/admin/], //  Routes accessible by "admin" role
};

//  Middleware function that runs before every request
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl; //  Extract the current pathname from URL
  const userInfo = await getCurrentUser(); //  Get currently logged-in user information

  //  If the user is NOT logged in
  if (!userInfo) {
    //  Allow access if trying to visit login or register page
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      //  Redirect unauthenticated users to login page
      //    and store the previous path in query parameter
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  //  If the user is logged in and has a valid role
  if (userInfo.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    //  Get allowed routes based on user's role
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];

    //  If requested path matches any allowed route pattern, allow access
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  //  Redirect to home page if no route permission is matched
  return NextResponse.redirect(new URL("/", request.url));
};

//  Define which paths the middleware should run on
export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};