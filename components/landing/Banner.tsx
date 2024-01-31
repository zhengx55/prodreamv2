import Image from 'next/image';
import Spacer from '../root/Spacer';

const Banner = () => {
  return (
    <section className='relative flex w-full justify-center sm:px-0 sm:py-20'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        <p className='base-regular text-center'>
          Trusted by academic writers from top universities around the world
        </p>
        <Spacer y='20' />

        <Spacer y='20' />
        <div className='flex flex-col gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0'>
          <div className='relative w-full rounded-2xl bg-doc-primary p-7 sm:w-[47%]'>
            <h2 className='title-regular text-white'>
              10+ Years of Experience
            </h2>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='170'
              height='170'
              viewBox='0 0 170 170'
              fill='none'
              className='absolute bottom-2 right-2'
            >
              <path
                opacity='0.1'
                d='M84.9842 14.1589C77.4475 14.1589 70.4491 16.7939 64.3999 21.2422C57.0899 22.4039 50.2049 25.4709 44.9207 30.7622C39.6294 36.0534 36.5624 42.9313 35.4007 50.2413C30.9524 56.2905 28.3174 63.2889 28.3174 70.8255C28.3174 78.3622 30.9524 85.3606 35.4007 91.4097C36.5624 98.7197 39.6294 105.598 44.9207 110.889C46.2665 112.235 48.0374 112.929 49.5674 113.991V148.742C49.5674 152.652 52.7408 155.826 56.6508 155.826H63.7341C64.492 155.826 65.2288 155.627 65.9442 155.386L84.9842 148.962L104.024 155.386C104.74 155.62 105.476 155.826 106.234 155.826H113.318C117.228 155.826 120.401 152.652 120.401 148.742V113.991C121.931 112.929 123.702 112.235 125.048 110.889C130.339 105.598 133.406 98.7197 134.568 91.4097C139.016 85.3606 141.651 78.3622 141.651 70.8255C141.651 63.2889 139.016 56.2905 134.568 50.2413C133.406 42.9313 130.339 36.0534 125.048 30.7622C119.756 25.4709 112.878 22.4039 105.568 21.2422C99.5192 16.7939 92.5209 14.1589 84.9842 14.1589ZM84.9842 28.3255C108.458 28.3255 127.484 47.3514 127.484 70.8255C127.484 94.2997 108.458 113.326 84.9842 113.326C61.51 113.326 42.4841 94.2997 42.4841 70.8255C42.4841 47.3514 61.51 28.3255 84.9842 28.3255ZM84.9842 42.4922C69.3371 42.4922 56.6508 55.1785 56.6508 70.8255C56.6508 86.4726 69.3371 99.1589 84.9842 99.1589C100.631 99.1589 113.318 86.4726 113.318 70.8255C113.318 55.1785 100.631 42.4922 84.9842 42.4922Z'
                fill='white'
              />
            </svg>
            <Spacer y='20' />
            <p className='text-regular leading-8 text-white'>
              Our team, consisting of experts from Harvard and Stanford, has
              brought decades of experience to helping over 100,000 students
              achieve academic success
            </p>
          </div>
          <div className='relative w-full rounded-2xl bg-blue-500 p-7 sm:w-[47%]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='170'
              height='170'
              viewBox='0 0 170 170'
              fill='none'
              className='absolute bottom-2 right-2'
            >
              <path
                opacity='0.1'
                d='M84.9893 13.8349C81.0793 13.8349 77.9059 17.0082 77.9059 20.9182C77.9059 24.8282 81.0793 28.0016 84.9893 28.0016C88.8993 28.0016 92.0726 24.8282 92.0726 20.9182C92.0726 17.0082 88.8993 13.8349 84.9893 13.8349ZM42.4893 35.0849C38.5793 35.0849 35.4059 38.2582 35.4059 42.1682C35.4059 46.0782 38.5793 49.2516 42.4893 49.2516C46.3993 49.2516 49.5726 46.0782 49.5726 42.1682C49.5726 38.2582 46.3993 35.0849 42.4893 35.0849ZM127.489 35.0849C123.579 35.0849 120.406 38.2582 120.406 42.1682C120.406 46.0782 123.579 49.2516 127.489 49.2516C131.399 49.2516 134.573 46.0782 134.573 42.1682C134.573 38.2582 131.399 35.0849 127.489 35.0849ZM84.9893 42.1682C65.4322 42.1682 49.5726 58.0278 49.5726 77.5849C49.5726 85.497 52.2713 92.7149 56.6559 98.6153C63.1088 107.292 63.7393 113.002 63.7393 120.085C70.8226 120.085 99.1559 120.085 106.239 120.085C106.239 113.002 109.979 103.269 113.323 98.8349C117.792 92.9062 120.406 85.582 120.406 77.5849C120.406 58.0278 104.546 42.1682 84.9893 42.1682ZM28.3226 77.5849C24.4126 77.5849 21.2393 80.7582 21.2393 84.6682C21.2393 88.5782 24.4126 91.7516 28.3226 91.7516C32.2326 91.7516 35.4059 88.5782 35.4059 84.6682C35.4059 80.7582 32.2326 77.5849 28.3226 77.5849ZM141.656 77.5849C137.746 77.5849 134.573 80.7582 134.573 84.6682C134.573 88.5782 137.746 91.7516 141.656 91.7516C145.566 91.7516 148.739 88.5782 148.739 84.6682C148.739 80.7582 145.566 77.5849 141.656 77.5849ZM63.7393 134.252C63.7393 145.989 73.2522 155.502 84.9893 155.502C96.7263 155.502 106.239 145.989 106.239 134.252H63.7393Z'
                fill='white'
              />
            </svg>
            <h2 className='text-regular  text-white'>Insights from Experts</h2>
            <Spacer y='20' />
            <p className='small-regular leading-8 text-white'>
              Our AI, enriched with decades of academic expertise, is at your
              service to craft papers that achieve top grades
            </p>
          </div>
        </div>
        <Spacer y='30' />
        <div className='flex-center h-[174px] w-full flex-col rounded-2xl bg-doc-primary/10 p-8 sm:h-[130px]'>
          <div className='flex w-full flex-col sm:max-w-[1200px] sm:flex-row sm:justify-between'>
            <h1 className='text-center text-[16px] font-[500] sm:text-left sm:text-[18px]'>
              Incubated by Harvard Innovation Lab and
              <br className='hidden sm:block' /> Microsoft Founders Hub
            </h1>
            <Spacer y='14' className='block sm:hidden' />
            <div className='flex items-center justify-center gap-x-2 sm:justify-start'>
              <Image
                alt='Harvard'
                src='/landing/team/Harvard.png'
                width={200}
                height={60}
                className='h-auto w-40'
              />
              <Image
                alt='Founders Hub'
                src='/landing/team/FHubs.png'
                width={200}
                height={60}
                className='h-auto w-40'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
