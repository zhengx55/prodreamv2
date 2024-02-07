import CSPostHogProvider from '@/components/root/PostHogProvider';
import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter, Libre_Baskerville, Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  referrer: 'no-referrer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${inter.variable} ${liber.variable}`}
      suppressHydrationWarning
    >
      <CSPostHogProvider>
        <body>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <TanstackProvider>
              <main className='flex h-screen w-screen overflow-auto sm:min-w-[1440px]'>
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
