import About from '@/components/landing/About';
import Banner from '@/components/landing/Banner';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Introduction from '@/components/landing/Introduction';
import NavBar from '@/components/landing/NavBar';
import Question from '@/components/landing/Question';
import Story from '@/components/landing/Story';
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
        {/* <ShowCase /> */}
        <Question />
        <Story />
        <Footer />
      </main>
    </LazyMotionProvider>
  );
}
