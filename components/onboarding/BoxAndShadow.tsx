import Image from 'next/image';

export const BoxAndShadow = () => (
  <Image
    src='/onboarding/Box_and_shadow.png'
    alt='centered character'
    width={912}
    height={238}
    className='absolute bottom-[15%] left-[15%] z-0'
  />
);
