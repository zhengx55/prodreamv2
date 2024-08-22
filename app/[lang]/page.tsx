import Agents from '@/components/landing/Agents';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Information from '@/components/landing/Information';
import Stories from '@/components/landing/Stories';
import Testimonials from '@/components/landing/Testimonials';
import Transform from '@/components/landing/Transform';
import type { Locale } from '@/i18n-config';
import { cookies } from 'next/headers';

export default async function Home({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  const token = cookies().get('token')?.value;
  const isAuth = !!token;
  return (
    <div className='relative'>
      <Header isAuth={isAuth} />
      <Hero />
      <Agents />
      <Stories />
      <Transform />
      <Information />
      <Testimonials />
      <Footer />
    </div>
  );
}
