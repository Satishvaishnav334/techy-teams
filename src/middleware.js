    // middleware.ts
    import { NextResponse } from 'next/server';
    import { decrypt } from '@/lib/auth';
    import Member from '@/app/api/models/users.js'
    export async function middleware(request,res) {
      const sessionCookie = request.cookies.get('token')?.value;
      const pathname = request.nextUrl.pathname;
      const user = sessionCookie && await decrypt(sessionCookie);
        console.log(user)
      if (!user && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      const isAdmin = user.role==='admin';
      console.log(isAdmin)
       if (pathname.startsWith("/admin/dashboard") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
      return NextResponse.next();
    }
    export const config = {
      matcher: ['/dashboard/:path*', '/api/protected/:path*'], // Protect specific paths
    };