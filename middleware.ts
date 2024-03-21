import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  // @ts-ignore
  const locales: string[] = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const isBase =
    [
      '/',
      '/onboard',
      '/onboard/language',
      '/onboard/education',
      '/login',
      '/signup',
      '/reset-password',
      '/editor',
      '/profile/setting',
      '/profile/subscription',
      '/pricing',
      '/essay-review',
    ].includes(pathname) || pathname.startsWith(`/editor/`);

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
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
