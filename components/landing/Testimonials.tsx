import Comments from './Comments';

const Testimonials = () => {
  return (
    <section
      className='relative flex h-screen flex-1 flex-col py-20'
      style={{
        background:
          'linear-gradient(270deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, #D7E2F9 100.57%)',
      }}
    >
      <h2 className='text-center text-[40px] font-medium leading-[48px]'>
        Loved by students, parents and
        <br /> counsellors groups
      </h2>
      <Comments />
    </section>
  );
};

export default Testimonials;
