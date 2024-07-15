import { BoxAndShadow } from '@/components/onboarding/BoxAndShadow';
import { CharacterMax } from '@/components/onboarding/CharacterMax';
import { CharacterJessica } from '@/components/onboarding/CharacterJessica';
import { CharacterDreami } from '@/components/onboarding/CharacterDreami';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className='relative flex h-full min-h-screen w-full flex-col items-center px-6 pt-12 '>
      <div className='relative h-[1080px] w-[1280px]'>
        <CharacterDreami />
        <CharacterJessica />
        <CharacterMax />
        <BoxAndShadow />
      </div>
    </div>
  );
}
