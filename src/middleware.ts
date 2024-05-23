import { NextRequest, NextResponse } from "next/server";
import updateSession from "./lib/updateSession";
import { decrypt } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("Auth_Session")?.value;
  const cartData = req.cookies.get("Cart")?.value;

  let parsed;
  let cart;

  if (session) parsed = await decrypt(session);
  if (cartData) cart = await decrypt(cartData);

  //Delete cart if session is not valid
  if (cart) {
    if (parsed?.id !== cart?.id) {
      const response = NextResponse.next({});
      response.cookies.delete("Cart");

      return response;
    }
  }

  const pathname = req.nextUrl.pathname;
  // If user logged in it doesn't need to log in in or register
  if (
    (session && pathname === "/login") ||
    (session && pathname === "/signUp")
  )
    return NextResponse.redirect(new URL("/", req.url));

  // Protect the dashboard page if no admin role
  if (
    parsed?.role !== "ADMIN" &&
    pathname.startsWith("/dashboard")
  )
    return NextResponse.redirect(new URL("/", req.url));

  // Refresh session if user doesnt stay logged in
  if (session && !parsed?.stayLoggedIn)
    return updateSession(parsed);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signUp",
    "/cart",
    "/shop",
    "/dashboard/:path*",
  ],
};
