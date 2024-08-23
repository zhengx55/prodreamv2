import Spacer from '../root/Spacer';

type Props = {};

const Agents = (props: Props) => {
  return (
    <section
      className='relative h-screen flex-1'
      style={{
        background:
          'linear-gradient(180deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, rgba(215, 226, 249, 0) 100%)',
      }}
      datatype='agents'
      aria-label='agents'
    >
      <Spacer y='150' className='block 2xl:block' />
      <h2 className='text-center font-inter text-[40px] font-semibold leading-[48px]'>
        Powerful AI Agents
        <br /> Your Ultimate College&nbsp;
        <span className='text-violet-700'>Admissions Support</span>
      </h2>
    </section>
  );
};

export default Agents;
