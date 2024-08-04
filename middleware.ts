import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';

const nextIntlMiddleware = createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const isBase = ['/', '/login', '/signup', '/reset-password'].includes(
    pathname
  );

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const locale = 'en';
  const alreadyOnLoginPage = i18n.locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname === `/${locale}/login` ||
      pathname === `/${locale}/signup` ||
      pathname === `/${locale}/reset-password`
  );

  if (pathnameIsMissingLocale && isBase) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${search ?? ''}`,
        req.url
      )
    );
  }

  if (alreadyOnLoginPage) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  const response = nextIntlMiddleware(req);
  if (response) return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
