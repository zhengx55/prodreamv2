import Image from 'next/image';
import Comments from './Comments';

const Testimonials = () => {
  return (
    <section className='gardient-container flex h-[880px] select-none flex-col overflow-hidden pt-20'>
      <h2 className='text-center text-[40px] font-medium leading-[48px]'>
        Loved by students, parents and
        <br /> counsellors groups
      </h2>
      <Image alt='' src='/landing/comments/container.png' fill />
      <Comments />
    </section>
  );
};

export default Testimonials;
