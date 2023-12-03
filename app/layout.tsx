import { TanstackProvider } from '@/context/TanstackProvider';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeProvider';
// import { i18n } from '@/i18n.config';
import { Poppins } from 'next/font/google';
import UserStoreProvider from '@/store/userProvider';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--poppins-font',
});

export const metadata: Metadata = {
  title: 'QuickApply',
  description:
    'The most powerful AI copilot in crafting personal statements. Powered by years of college admission expertise, QuickApply&apos;s AI offers instant and professional feedback with detailed suggestions 24/7. Get insights on structure, authenticity, and wording, ensuring your essay truly reflects the traits and values that schools seek.',
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
            <UserStoreProvider>
              <section className='h-screen w-screen min-w-[1400px] md:flex md:overflow-x-auto'>
                {children}
                {/* <Analytics /> */}
              </section>
            </UserStoreProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
