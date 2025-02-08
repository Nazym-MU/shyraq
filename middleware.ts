import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = ['/', '/sign-in', '/sign-up'];

const isProtectedRoute = createRouteMatcher([
    '/learn',
    '/dashboard'
])

export default clerkMiddleware((auth, req) => {
    if (publicRoutes.includes(new URL(req.url).pathname)) {
        return NextResponse.next();
    }

    if (isProtectedRoute(req)) {
        return auth().then((session) => {
            if (!session.userId) {
                return NextResponse.redirect(new URL('/sign-in', req.url));
            }
            return NextResponse.next();
        });
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};