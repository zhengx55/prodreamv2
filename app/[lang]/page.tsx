import About from '@/components/landing/About';
import Banner from '@/components/landing/Banner';
import BottomBanner from '@/components/landing/BottomBanner';
import Comments from '@/components/landing/Comments';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Introduction from '@/components/landing/Introduction';
import NavBar from '@/components/landing/navbar/NavBar';
import Question from '@/components/landing/Question';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Home({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
      <NavBar search_param={from} lang={lang} t={dict.Homepage} />
      <Hero lang={lang} search_param={from} t={dict.Homepage} />
      <Banner lang={lang} t={dict.Homepage} />
      <About lang={lang} t={dict.Homepage} />
      <Introduction lang={lang} t={dict.Homepage} />
      <Comments lang={lang} t={dict.Homepage} />
      <Question lang={lang} t={dict.Homepage} />
      <BottomBanner  />
      <Footer />
    </main>
  );
}
