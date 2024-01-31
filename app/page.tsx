import Footer from '@/components/landing/Footer';
import Har from '@/components/landing/Har';
import Hero from '@/components/landing/Hero';
import NavBar from '@/components/landing/NavBar';
import Question from '@/components/landing/Question';
import Story from '@/components/landing/Story';
import Swift from '@/components/landing/Swift';
import Team from '@/components/landing/Team';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';

export default function Home() {
  return (
    <LazyMotionProvider>
      <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
        <NavBar />
        <Hero />
        <Team />
        <Swift />
        <Har />
        {/* <ShowCase /> */}
        <Question />
        <Story />
        <Footer />
      </main>
    </LazyMotionProvider>
  );
}
