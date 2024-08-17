import PageViewTrack from '@/components/root/PageViewTrack';
import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import { locales } from '@/i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Inter, Libre_Baskerville, Poppins } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--poppins-font',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--inter-font',
  preload: false,
});

const liber = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--liber-font',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  referrer: 'no-referrer',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  title: siteConfig.name,
  creator: '@applify-ai',
  description: siteConfig.description,
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@applify-ai',
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  unstable_setRequestLocale(params.lang);

  const messages = await getMessages();

  return (
    <html
      lang={params.lang}
      className={`${poppins.variable} ${inter.variable} ${liber.variable}`}
      suppressHydrationWarning
    >
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <TanstackProvider>
            <NextIntlClientProvider messages={messages}>
              <main className='h-screen overflow-x-auto sm:min-w-[1440px]'>
                <Suspense>
                  <PageViewTrack />
                </Suspense>
                {children}
                <Toaster richColors visibleToasts={1} closeButton />
              </main>
            </NextIntlClientProvider>
          </TanstackProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
