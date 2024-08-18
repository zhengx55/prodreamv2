import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';

const nextIntlMiddleware = createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const response = nextIntlMiddleware(req);
  const locale = 'en';
  const alreadyOnLoginPage = i18n.locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname.includes('login') ||
      pathname.includes('reset-password')
  );

  if (alreadyOnLoginPage) {
    if (response) return response;
  }

  const token = req.cookies.get('token');
  if (!token && !alreadyOnLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (response) return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
