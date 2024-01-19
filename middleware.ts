// My _middleware.js file
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  if (!token) return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/writtingpal/:path*',
    },
    {
      source: '/profile/:path*',
    },
  ],
};
