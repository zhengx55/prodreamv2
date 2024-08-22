import Spacer from '../root/Spacer';

type Props = {};

const Agents = (props: Props) => {
  return (
    <section
      className='relative h-screen flex-1'
      style={{
        background:
          'linear-gradient(270deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, #D7E2F9 100.57%)',
      }}
      datatype='agents'
      aria-label='agents'
    >
      <Spacer y='150' className='block 2xl:block' />
      <h2 className='text-center font-inter text-[40px] font-semibold leading-[48px]'>
        Powerful AI agents
        <br /> Your ultimate college&nbsp;
        <span className='text-violet-700'>Admissions Support</span>
      </h2>
    </section>
  );
};

export default Agents;
