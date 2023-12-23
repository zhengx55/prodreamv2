import Footer from '@/components/landing/Footer';
import Guidence from '@/components/landing/Guidence';
import Hero from '@/components/landing/Hero';
import NavBar from '@/components/landing/NavBar';
import ShowCase from '@/components/landing/ShowCase';
import Story from '@/components/landing/Story';
import Team from '@/components/landing/Team';

export default async function Home({}) {
  return (
    <main className='relative flex w-full flex-col'>
      <NavBar />
      <Hero />
      <Guidence />
      <Team />
      <ShowCase />
      <Story />
      <Footer />
    </main>
  );
}
