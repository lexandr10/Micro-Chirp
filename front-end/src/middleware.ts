import { NextRequest, NextResponse } from "next/server";

import { EnumToken } from "./services/auth-token.service";


const PRIVATE_PAGES = ["/dashboard"];

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get(EnumToken.ACCESS_TOKEN)?.value;

    if (pathname.startsWith("/auth") && accessToken) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    const isPrivatePage = PRIVATE_PAGES.some(page => pathname.startsWith(page))
    if (isPrivatePage && !accessToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    "/", 
    "/auth/:path*",
    "/dashboard",
  ],
};