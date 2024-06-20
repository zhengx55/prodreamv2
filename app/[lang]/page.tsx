import About from '@/components/landing/About';
import AboutCN from '@/components/landing/AboutCN';
import Banner from '@/components/landing/Banner';
import BannerCN from '@/components/landing/BannerCN';
import BannerPlusCN from '@/components/landing/BannerPlusCN';
import BottomBanner from '@/components/landing/BottomBanner';
import BottomBannerCN from '@/components/landing/BottomBannerCN';
import Comments from '@/components/landing/Comments';
import CommentsCN from '@/components/landing/CommentsCN';
import Footer from '@/components/landing/Footer';
import FooterCN from '@/components/landing/FooterCN';
import Hero from '@/components/landing/Hero';
import HeroCN from '@/components/landing/HeroCN';
import SloganCN from '@/components/landing/SloganCN';
import Introduction from '@/components/landing/Introduction';
import IntroductionCN from '@/components/landing/IntroductionCN';
import NavBar from '@/components/landing/navbar/NavBar';
import NavBarCN from '@/components/landing/navbar/NavBarCN';
import Question from '@/components/landing/Question';
import type { Locale } from '@/i18n-config';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Home({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  unstable_setRequestLocale(lang);
  const isInChina = lang === 'cn';

  const dict = await getDictionary(lang);

  return (
    <>
      {isInChina ? (
        <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
          <NavBarCN search_param={from} lang={lang} t={dict.Homepage} />
          <SloganCN lang={lang} search_param={from} t={dict.Homepage} />
          <BannerCN />
          <HeroCN lang={lang} search_param={from} t={dict.Homepage} />
          <AboutCN lang={lang} t={dict.Homepage} />
          <IntroductionCN lang={lang} t={dict.Homepage} />
          <CommentsCN lang={lang} t={dict.Homepage} />
          <BannerPlusCN lang={lang} t={dict.Homepage} />
          <BottomBannerCN />
          <FooterCN />
        </main>
      ) : (
        <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
          <NavBar search_param={from} lang={lang} t={dict.Homepage} />
          <Hero lang={lang} search_param={from} t={dict.Homepage} />
          <Banner lang={lang} t={dict.Homepage} />
          <About lang={lang} t={dict.Homepage} />
          <Introduction lang={lang} t={dict.Homepage} />
          <Comments lang={lang} t={dict.Homepage} />
          <Question lang={lang} t={dict.Homepage} />
          <BottomBanner />
          <Footer />
        </main>
      )}
    </>
  );
}
