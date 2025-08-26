// middleware.ts
import { NextResponse,NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';
export async function middleware(request) {
    const sessionCookie = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;
    const user = sessionCookie && await decrypt(sessionCookie);
    const isAdmin = user.role === 'admin';
    console.log(user, "user", isAdmin)
    if (!isAdmin && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname.startsWith("/admin/dashboard") && user?.role !== "admin") {
      console.log(isAdmin)
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }
  export const config = {
    matcher: ['/dashboard/:path*', '/api/protected/:path*'], // Protect specific paths
  };

//Not working


