import Image from 'next/image';

export const CharacterDreami = () => (
  <Image
    src='/onboarding/dreami.png'
    alt='centered character'
    width={212}
    height={212}
    className='absolute right-[15%] top-[24%] z-20 rotate-[15deg] transform'
  />
);
