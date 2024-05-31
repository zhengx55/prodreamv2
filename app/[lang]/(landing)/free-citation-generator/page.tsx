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
                  Create Accurate Citation for Free
                </h1>
                <Spacer y='64' />
                <p className='text-xl leading-loose text-neutral-500'>
                  Tired of manually creating citations one by one? Our
                  user-friendly citation tool offers an efficient solution.
                  Generate precise citations effortlessly, saving time and
                  ensuring accuracy in your references.
                </p>
                <Spacer y='90' />
                <Button role='link' className='size-max rounded-md px-6 py-4'>
                  <p className='font-bold text-white'>
                    Try it Now!&nbsp;
                    <span className='font-normal'>It’s Free</span>
                  </p>
                </Button>
              </div>
              <Image
                alt='ai_assistant'
                src='/landing/citation_plagiarism/hero.png'
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
                <h2 className='text-2xl'>Drowning in References?</h2>
                <p className='text-lg leading-loose text-neutral-500'>
                  Instantly organize your bibliography with our Citation
                  Generator, tailoring each entry to the required academic style
                  guide effortlessly.
                </p>
              </div>
              <Image
                alt='citation-info'
                src='/landing/citation_plagiarism/info_01.png'
                width={400}
                height={200}
                className='h-auto w-[360px]'
              />
            </div>
            <div className='flex w-full justify-between rounded-2xl bg-slate-50 sm:flex-row sm:px-[70px] sm:py-[80px]'>
              <Image
                alt='citation-info'
                src='/landing/citation_plagiarism/info_02.png'
                width={400}
                height={200}
                className='h-auto w-[360px]'
              />
              <div className='flex w-3/5 flex-col gap-y-4'>
                <h2 className='text-2xl'>Beat the Plagiarism Concerns</h2>
                <p className='text-lg leading-loose text-neutral-500'>
                  Utilize our Plagiarism Checker to scan your document with
                  precision, get a downloadable plagiarism report with smart
                  suggestions for original writing.
                </p>
              </div>
            </div>
            <div className='flex w-full justify-between rounded-2xl bg-slate-50 sm:flex-row sm:px-[70px] sm:py-[80px]'>
              <div className='flex w-3/5 flex-col gap-y-4'>
                <h2 className='text-2xl'>Fast-Track Your Citations</h2>
                <p className='text-lg leading-loose text-neutral-500'>
                  Our tool not only creates citations but also formats your
                  entire reference list in seconds, adhering to academic
                  standards and various styles.
                </p>
              </div>
              <Image
                alt='citation-info'
                src='/landing/citation_plagiarism/info_03.png'
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
                src='/landing/citation_plagiarism/citation.svg'
                width={80}
                height={80}
                className='size-[80px]'
              />
              <h3 className='base-semibold'>Streamlined Citations</h3>
              <h4 className='text-base'>and Easy Referencing</h4>
              <p className='text-center text-base leading-loose text-neutral-500'>
                Say goodbye to citation woes with our comprehensive tool that
                covers all citation styles, making referencing a breeze for any
                writing.
              </p>
            </div>
            <div className='flex w-1/3 flex-col items-center gap-y-2 rounded-2xl bg-slate-50 sm:p-10'>
              <Icon
                alt=''
                src='/landing/citation_plagiarism/smart_citation.svg'
                width={80}
                height={80}
                className='size-[80px]'
              />
              <h3 className='base-semibold'>Smart Citation</h3>
              <h4 className='text-base'>Precision at Your Fingertips</h4>
              <p className='text-center text-base leading-loose text-neutral-500'>
                Covering most popular styles, including APA, MLA, Chicago and
                many more, our Citation tool crafts perfect citations every
                time, ensuring your references are spotless and on point.
              </p>
            </div>
            <div className='flex w-1/3 flex-col items-center gap-y-2 rounded-2xl bg-slate-50 sm:p-10'>
              <Icon
                alt=''
                src='/landing/citation_plagiarism/plagiarism.svg'
                width={80}
                height={80}
                className='size-[80px]'
              />
              <h3 className='base-semibold'>Plagiarism Check</h3>
              <h4 className='text-base'>Integrity in Every Line</h4>
              <p className='text-center text-base leading-loose text-neutral-500'>
                Gain peace of mind with thorough checks and insightful
                assistance to maintain the authenticity and credibility of your
                academic endeavors.
              </p>
            </div>
          </div>
        </section>
      </CaptureProvider>
    </main>
  );
}
