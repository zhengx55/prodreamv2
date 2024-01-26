import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import GoogleAnalytics from '@/google/GoogleAnalytics';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import CSPostHogProvider from '@/components/root/PostHogProvider';
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
      className={`${poppins.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <CSPostHogProvider>
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <TanstackProvider>
            <main className='flex h-screen w-screen overflow-auto sm:min-h-[900px] sm:min-w-[1440px]'>
              {children}
              <Toaster richColors visibleToasts={1} />
              {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                <GoogleAnalytics />
              ) : null}
            </main>
          </TanstackProvider>
        </GoogleOAuthProvider>
      </body>
      </CSPostHogProvider>
    </html>
  );
}
