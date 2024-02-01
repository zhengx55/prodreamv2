import About from '@/components/landing/About';
import Banner from '@/components/landing/Banner';
import BottomBanner from '@/components/landing/BottomBanner';
import Comments from '@/components/landing/Comments';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Introduction from '@/components/landing/Introduction';
import NavBar from '@/components/landing/NavBar';
import Question from '@/components/landing/Question';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';

export default function Home() {
  return (
    <LazyMotionProvider>
      <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
        <NavBar />
        <Hero />
        <Banner />
        <About />
        <Introduction />
        <Comments />
        {/* <ShowCase /> */}
        <Question />
        <BottomBanner />
        <Footer />
      </main>
    </LazyMotionProvider>
  );
}
