import { TanstackProvider } from '@/context/TanstackProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import './globals.css';
// import { i18n } from '@/i18n.config';
import { siteConfig } from '@/config/siteConfig';
import StoreProvider from '@/store/storeProvider';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--poppins-font',
});

export const metadata: Metadata = {
  // openGraph: { title: 'ProDream' },
  title: siteConfig.name,
  creator: 'applify-ai',
  description: siteConfig.description,
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
          <TanstackProvider>
            <StoreProvider>
              <main className='flex h-screen w-screen overflow-auto sm:min-h-[900px] sm:min-w-[1400px]'>
                {children}
                <Toaster richColors visibleToasts={1} />
                {/* <Analytics /> */}
              </main>
            </StoreProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
