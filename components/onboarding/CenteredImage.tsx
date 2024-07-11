import Image from 'next/image';

export const CenteredImage = () => (
  <Image
    src='/onboarding/dreami_test.png'
    alt='centered character'
    width={572}
    height={682}
    className='animate-float absolute top-1/3'
  />
);
