'use client';
import Footer from '@/components/landing/Footer';
import Swift from '@/components/landing/Swift';
import Har from '@/components/landing/Har';
import Hero from '@/components/landing/Hero';
import NavBar from '@/components/landing/NavBar';
import ShowCase from '@/components/landing/ShowCase';
import Question from '@/components/landing/Question';
import Story from '@/components/landing/Story';
import Team from '@/components/landing/Team';
import { LazyMotion, domAnimation } from 'framer-motion';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
        <NavBar />
        <Hero />
        <Team />
        <Swift />
        <Har/>
        <ShowCase />
        <Question />
        <Story />
        <Footer />
      </main>
    </LazyMotion>
  );
}
