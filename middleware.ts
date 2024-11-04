import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { getCookies } from 'next-client-cookies/server';

const protectedRoutes = ["/", "/payment/listrik", "/top-up", "/profile", "/transaction"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookies = await getCookies();
  
  const cookie = cookies.get('session') || "" as string;

  let session;

  if(cookie) {
    session = jwtDecode(cookie) as {
      email: string;
      memberCode: string;
      iat: number;
      exp: number;
    };
  }

  if (isProtectedRoute && !session?.email) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.email) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
