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
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const locale = getLocale(req);

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${search ?? ''}`,
        req.url
      )
    );
  }
  const alreadyOnLoginPage = i18n.locales.some(
    (locale) =>
      pathname === `/${locale}` ||
      pathname === `/${locale}/login` ||
      pathname.startsWith(`/${locale}/login`) ||
      pathname === `/${locale}/signup` ||
      pathname.startsWith(`/${locale}/signup`) ||
      pathname === `/${locale}/reset-password` ||
      pathname.startsWith(`/${locale}/reset-password`)
  );

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
