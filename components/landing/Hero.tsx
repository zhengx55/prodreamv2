type Props = {};

const Hero = (props: Props) => {
  return (
    <section
      className='flex-center h-screen flex-1'
      style={{
        background:
          ' linear-gradient(270deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, #D7E2F9 100.57%);',
      }}
      datatype='hero'
      aria-label='hero'
    >
      <div className='w-[70%]'></div>
    </section>
  );
};

export default Hero;
