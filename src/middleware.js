// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';
export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  console.log("the path name is ", pathname)
  const user = token && await decrypt(token);
  const isAdmin = user?.role === 'admin';
  console.log(user, "user", isAdmin)

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (pathname.startsWith('/api/admin/')) {
    if (!isAdmin) {
      console.log(isAdmin)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Matches all paths under /api
};

//Not working
// if (pathname.startsWith('/api/admin/get-tasks')) {
//   if (!isAdmin) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//   return NextResponse.next();
// }
// if (pathname.startsWith("/admin/dashboard")) {
//   if (isAdmin) {
//     return NextResponse.next();
//   }
//   console.log(isAdmin)
//   return NextResponse.redirect(new URL("/login", request.url));
// }
