import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define paths that require authentication
  const protectedPaths = ['/dashboard'];
  const protectedAdminPaths = ['/dashboard/admin'];

  // Check if the current path is a protected path
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const authToken = request.cookies.get('token');
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  if (protectedAdminPaths.some(path => pathname.startsWith(path))) {
    const authToken = request.cookies.get('token');
    
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If authenticated or not a protected path, allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to run middleware on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*', // Match any path under /dashboard
    '/profile/:path*',   // Match any path under /profile
    // Exclude static files, API routes, and the login page itself
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)', 
  ],
};