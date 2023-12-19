import { TanstackProvider } from '@/context/TanstackProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import './globals.css';
// import { i18n } from '@/i18n.config';
import UserStoreProvider from '@/store/userProvider';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--poppins-font',
});

export const metadata: Metadata = {
  title: 'ProDream',
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
              <section className='h-screen min-h-[850px] w-screen min-w-[1400px] md:flex md:overflow-auto'>
                {children}
                <Toaster richColors visibleToasts={1} />
                {/* <Analytics /> */}
              </section>
            </UserStoreProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
