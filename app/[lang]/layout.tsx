import PageViewTrack from '@/components/root/PageViewTrack';
import SteyProvider from '@/components/root/SteyProvider';
import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import Hotjar from '@/htojar/Hotjar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { Inter, Libre_Baskerville, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { i18n, type Locale } from '../../i18n-config';
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

const cnFont = localFont({
  src: '../../public/font/XiQuejuzhenti.ttf',
  display: 'swap',
  variable: '--cn-font',
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
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      lang={params.lang}
      className={`${poppins.variable} ${inter.variable} ${liber.variable} ${cnFont.variable}`}
      suppressHydrationWarning
    >
      {process.env.NODE_ENV === 'production' && (
          <Hotjar />
      )}
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <TanstackProvider>
            <main className='flex h-screen w-screen overflow-auto sm:min-w-[1440px]'>
              <Suspense>
                <PageViewTrack />
              </Suspense>
              {children}
              <Toaster richColors visibleToasts={1} />
            </main>
          </TanstackProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
