import PageViewTrack from '@/components/root/PageViewTrack';
import CSPostHogProvider from '@/components/root/PostHogProvider';
import { siteConfig } from '@/config/siteConfig';
import { TanstackProvider } from '@/context/TanstackProvider';
import Hotjar from '@/htojar/Hotjar';
import { generateId } from '@/lib/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter, Libre_Baskerville, Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import { PostHog } from 'posthog-node';
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bootstrapData = await getBootstrapData();
  return (
    <html
      lang='en'
      className={`${poppins.variable} ${inter.variable} ${liber.variable}`}
      suppressHydrationWarning
    >
      <Hotjar />
      <CSPostHogProvider
        bootstrapData={
          bootstrapData ?? {
            distinctID: '9a59338a-2994-452f-bc9b-0052a3f07a75',
            featureFlags: {},
          }
        }
      >
        <body>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <TanstackProvider>
              <main className='flex h-screen w-screen overflow-auto sm:min-w-[1440px]'>
                <PageViewTrack />
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

export async function getBootstrapData() {
  let distinct_id = '';
  const phProjectAPIKey = 'phc_hJ9Vfuzn4cByNbktugzjuJpHGkVYfXeQE494H5nla42';
  const phCookieName = `ph_${phProjectAPIKey}_posthog`;
  debugger;
  const cookieStore = cookies();
  const phCookie = cookieStore.get(phCookieName);
  debugger;
  if (phCookie) {
    const phCookieParsed = JSON.parse(phCookie.value);
    distinct_id = phCookieParsed.distinct_id;
  }
  if (!distinct_id) {
    distinct_id = generateId();
  }

  const client = new PostHog(phProjectAPIKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  const flags = await client.getAllFlags(distinct_id);
  const bootstrap = {
    distinctID: distinct_id,
    featureFlags: flags,
  };

  return bootstrap;
}
