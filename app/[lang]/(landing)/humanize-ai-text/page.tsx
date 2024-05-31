import CaptureProvider from '@/components/landing/CaptureProvider';
import NavBar from '@/components/landing/navbar/NavBar';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Page({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  const dict = await getDictionary(lang);
  const trans = await getTranslations('Homepage');

  return (
    <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
      <NavBar search_param={from} lang={lang} t={dict.Homepage} />
      <CaptureProvider event='AiWritting-landing'>
        <section className='flex w-full flex-col items-center justify-center px-4 sm:px-0'>
          <div className='relative flex w-full justify-center'>
            <div className='absolute -z-10 hidden h-full w-full sm:block'>
              <Image
                draggable='false'
                alt='gardient-bg'
                className='absolute top-10'
                fill
                src='/landing/heros/Mask_group.png'
              />
            </div>
            <div className='flex h-full w-full py-10 sm:w-[1200px] sm:justify-between sm:pt-20'>
              <div className='flex w-1/2 flex-col'>
                <h1 className='font-baskerville text-5xl font-bold leading-snug'>
                  Humanize AI Text with ProDream
                </h1>
                <Spacer y='64' />
                <p className='text-xl leading-loose text-neutral-500'>
                  Ease your concerns about AI-generated content in your paper
                  with ProDream, ensuring academic integrity while adding a
                  personalized touch.
                </p>
                <Spacer y='90' />
                <Button role='link' className='size-max rounded-md px-6 py-4'>
                  <p className='font-bold text-white'>Humanize Now!</p>
                </Button>
              </div>
              <Image
                alt='ai_assistant'
                src='/landing/detection_humanize/hero.png'
                width={600}
                height={700}
                className='h-auto w-[500px]'
                priority
              />
            </div>
          </div>
          <div className='flex w-full flex-col py-10 sm:w-[1200px] sm:justify-between sm:gap-y-9 sm:py-20'>
            <div className='flex w-full justify-between rounded-2xl bg-slate-50 sm:flex-row sm:px-[70px] sm:py-[80px]'>
              <div className='flex w-3/5 flex-col gap-y-4'>
                <h2 className='text-2xl'>Ensure Your Content Originality:</h2>
                <p className='text-lg leading-loose text-neutral-500'>
                  Navigate the nuances of AI contributions in your academic work
                  with our cutting-edge AI Detection tool, ensuring the
                  authenticity of your narrative.
                </p>
              </div>
              <Image
                alt='assistan-info'
                src='/landing/detection_humanize/info_01.png'
                width={400}
                height={200}
                className='h-auto w-[360px]'
              />
            </div>
            <div className='flex w-full justify-between rounded-2xl bg-slate-50 sm:flex-row sm:px-[70px] sm:py-[80px]'>
              <Image
                alt='assistan-info'
                src='/landing/detection_humanize/info_02.png'
                width={400}
                height={200}
                className='h-auto w-[360px]'
              />
              <div className='flex w-3/5 flex-col gap-y-4'>
                <h2 className='text-2xl'>
                  Personalize with ProDream&apos;s Humanizer:
                </h2>
                <p className='text-lg leading-loose text-neutral-500'>
                  Add a human touch to any piece of writing with ProDream&apos;s
                  Humanizer feature, making your content relatable and genuinely
                  yours.
                </p>
              </div>
            </div>
            <div className='flex w-full justify-between rounded-2xl bg-slate-50 sm:flex-row sm:px-[70px] sm:py-[80px]'>
              <div className='flex w-3/5 flex-col gap-y-4'>
                <h2 className='text-2xl'>
                  Bypass AI Detection: Crafting Authenticity:
                </h2>
                <p className='text-lg leading-loose text-neutral-500'>
                  Use our AI Detection tool not just to identify AI-written
                  sections, but to transform them into content with human-like
                  finesse and warmth.
                </p>
              </div>
              <Image
                alt='assistan-info'
                src='/landing/detection_humanize/info_03.png'
                width={400}
                height={200}
                className='h-auto w-[360px]'
              />
            </div>
          </div>
          <div className='flex w-full flex-col pb-10 sm:w-[1200px] sm:flex-row sm:justify-between sm:gap-x-4 sm:pb-20'>
            <div className='flex w-1/3 flex-col items-center gap-y-2 rounded-2xl bg-slate-50 sm:p-10'>
              <Icon
                alt=''
                src='/landing/detection_humanize/footprints.svg'
                width={80}
                height={80}
                className='size-[80px]'
              />
              <h3 className='base-semibold'>Paraphrase</h3>
              <h4 className='text-base'>Transform Ideas with Clarity</h4>
              <p className='text-center text-base leading-loose text-neutral-500'>
                Discover clear and concise ways to express complex concepts,
                bringing forth the strength of your ideas with the Paraphrase
                feature.
              </p>
            </div>
            <div className='flex w-1/3 flex-col items-center gap-y-2 rounded-2xl bg-slate-50 sm:p-10'>
              <Icon
                alt=''
                src='/landing/detection_humanize/clear.svg'
                width={80}
                height={80}
                className='size-[80px]'
              />
              <h3 className='base-semibold'>Elevate Language Quality</h3>
              <h4 className='text-base'>Academic Tone Enhanced</h4>
              <p className='text-center text-base leading-loose text-neutral-500'>
                Boost the academic tone of your essays, ensuring every sentence
                meets the rigors of scholarly standards with AI Copilot.
              </p>
            </div>
            <div className='flex w-1/3 flex-col items-center gap-y-2 rounded-2xl bg-slate-50 sm:p-10'>
              <Icon
                alt=''
                src='/landing/detection_humanize/humanize.svg'
                width={80}
                height={80}
                className='size-[80px]'
              />
              <h3 className='base-semibold'>AI-Driven Fluency</h3>
              <h4 className='text-base'>Smooth and Coherent Text</h4>
              <p className='text-center text-base leading-loose text-neutral-500'>
                Experience the ease of reading and understanding that AI Copilot
                offers, turning technical jargon into compelling academic
                narrative.
              </p>
            </div>
          </div>
        </section>
      </CaptureProvider>
    </main>
  );
}
