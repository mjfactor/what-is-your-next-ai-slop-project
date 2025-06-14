// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    // If the user is logged in and tries to access the auth page,
    // redirect them to the home page.
    if (sessionCookie && pathname === '/auth') { // Use exact match for /auth
        const homeUrl = new URL('/', request.url);
        return NextResponse.redirect(homeUrl);
    }

    // If the user is not logged in and tries to access a protected route
    // (any route the middleware runs on, excluding /auth and static/API assets),
    // redirect them to the sign-in page.
    // The matcher below ensures this middleware doesn't run for api, _next/*, favicon.ico.
    // So, we only need to explicitly exclude /auth here for non-logged-in users.
    if (!sessionCookie && pathname !== '/auth') {
        const signInUrl = new URL('/auth', request.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * This allows the middleware to run on /auth (for logged-in user redirection)
         * and on other application pages for protection.
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};