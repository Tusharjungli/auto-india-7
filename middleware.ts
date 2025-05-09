import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";

  // If logged in and visiting login/signup, redirect to products
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  // If not logged in and visiting a protected page
  if (!token && req.nextUrl.pathname.startsWith("/checkout")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/checkout"],
};
