import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute =
    path === '/login' ||
    path === '/signup' ||
    path === '/verifyemail' ||
    path === '/forgotpassword' ||
    path === '/resetpassword';
  const token = request.cookies.get('token')?.value || '';
  console.log(token);

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signup',
    '/login',
    '/verifyemail',
    '/profile',
    '/resetpassword',
    '/forgotpassword',
  ],
};
