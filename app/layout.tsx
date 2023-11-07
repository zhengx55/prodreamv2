import { TanstackProvider } from '@/context/TanstackProvider';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeProvider';
// import { i18n } from '@/i18n.config';
import { UIProviders } from '@/context/NextUIProvider';
import { Poppins } from 'next/font/google';
import { Toast } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WritingPal',
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
    <html lang='en' className={poppins.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <TanstackProvider>
            <UIProviders>
              <section className='h-screen w-screen md:flex md:min-w-[1400px] md:overflow-x-auto'>
                {children}
              </section>
              <Toaster />
            </UIProviders>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
