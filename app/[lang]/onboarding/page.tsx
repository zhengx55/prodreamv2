import { getTranslations } from 'next-intl/server';
import { CenteredImage } from '@/components/onboarding/CenteredImage';
import InteractBlock from '@/components/onboarding/InteractBlock';
import { ShiningStar } from '@/components/onboarding/ShiningStar';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className='relative flex h-full min-h-screen w-full flex-col items-center px-6 pt-12 '>
      <ShiningStar
        top='10%'
        left='10%'
        scale={1.5}
        twinkle={true}
        twinkleDuration='1.5s'
      />
      <ShiningStar
        bottom='65%'
        right='15%'
        width={150}
        height={150}
        scale={0.8}
        twinkle={true}
        twinkleDuration='2s'
      />
      <ShiningStar
        top='30%'
        left='20%'
        width={100}
        height={100}
        scale={1}
        twinkle={true}
        twinkleDuration='1s'
      />
      <CenteredImage />
      <InteractBlock />
    </div>
  );
}
