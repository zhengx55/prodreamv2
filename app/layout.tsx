import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import GoogleAnalytics from '@/google/GoogleAnalytics';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--poppins-font',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
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
    // images: [`${siteConfig.url}/og.jpg`],
    creator: '@applify-ai',
  },
};

// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }));
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={poppins.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <TanstackProvider>
              <main className='flex h-screen w-screen overflow-auto sm:min-h-[900px] sm:min-w-[1400px]'>
                {children}
                <Toaster richColors visibleToasts={1} />
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                  <GoogleAnalytics />
                ) : null}
                {process.env.NODE_ENV === 'production' ? (
                  <SpeedInsights />
                ) : null}
              </main>
            </TanstackProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
