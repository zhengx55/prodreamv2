import Image from 'next/image';

export const CenteredImage = () => (
  <Image
    src='/onboarding/dreami.png'
    alt='centered character'
    width={572}
    height={682}
    className='animate-float absolute top-[15%]'
  />
);
