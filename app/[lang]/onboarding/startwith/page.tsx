import { BoxAndShadow } from '@/components/onboarding/BoxAndShadow';
import { CharacterDreami } from '@/components/onboarding/CharacterDreami';
import { CharacterJessica } from '@/components/onboarding/CharacterJessica';
import { CharacterMax } from '@/components/onboarding/CharacterMax';
import StartWithButton from '@/components/onboarding/StartWithButton';
import { Locale } from '@/i18n-config';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className='relative flex h-full min-h-screen w-full flex-col items-center overflow-hidden px-6 pt-12 '>
      <div className='relative h-[1080px] w-[1280px]'>
        <CharacterDreami />
        <CharacterJessica />
        <CharacterMax />
        <BoxAndShadow />
      </div>
      <StartWithButton />
    </div>
  );
}
