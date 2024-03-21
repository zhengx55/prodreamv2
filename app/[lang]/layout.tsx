import PageViewTrack from '@/components/root/PageViewTrack';
import CSPostHogProvider from '@/components/root/PostHogProvider';
import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import Hotjar from '@/htojar/Hotjar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter, Libre_Baskerville, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { i18n, type Locale } from '../../i18n-config';
import './globals.css';

const PostHogPageView = dynamic(() => import('@/components/root/PostHug'), {
  ssr: false,
});

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
  preload: true,
});

const liber = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--liber-font',
  preload: true,
});

const cnFont = localFont({
  src: '../../public/font/XiQuejuzhenti.ttf',
  display: 'swap',
  variable: '--cn-font',
  preload: true,
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
  // const bootstrapData = await getBootstrapData();
  return (
    <html
      lang={params.lang}
      className={`${poppins.variable} ${inter.variable} ${liber.variable} ${cnFont.variable}`}
      suppressHydrationWarning
    >
      <Hotjar />
      <CSPostHogProvider>
        <body>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <TanstackProvider>
              <main className='flex h-screen w-screen overflow-auto sm:min-w-[1440px]'>
                <Suspense>
                  <PageViewTrack />
                </Suspense>
                <PostHogPageView />
                {children}
                <Toaster richColors visibleToasts={1} />
              </main>
            </TanstackProvider>
          </GoogleOAuthProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
