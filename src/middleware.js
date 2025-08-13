

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
    import { jwtVerify } from 'jose';
export function middleware(request, res) {
    const { pathname } = request.nextUrl;
    try {
        const protectedPaths = ['/dashboard'];
        const protectedAdminPaths = ['/dashboard/admin'];
        if (protectedPaths.some(path => pathname.startsWith(path))) {
            const token = request.cookies.get('token');
            const clearToken = token.value;
            if (!clearToken) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            const decode2 = jwt.decode(clearToken)
            console.log(decode2)
            // jwtVerify(token, process.env.JWT_SECRET);
        
            return NextResponse.next();
        }

    }
    catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/login', request.url));
    }





}
export const config = {
    matcher: [
        '/dashboard/:path*', // Match any path under /dashboard
        '/profile/:path*',   // Match any path under /profile
        // Exclude static files, API routes, and the login page itself
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};

