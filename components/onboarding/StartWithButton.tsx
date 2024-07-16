'use client';
import { useOnboarding } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const GradientButton = ({ children }: { children: React.ReactNode }) => {
  const handleClick = () => {
    console.log('To Chat');
  };

  return (
    <button
      className={
        'relative min-w-[454px] transform rounded-full border-4 border-white/20 bg-white/80 px-12 py-4 transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/40 hover:bg-white'
      }
      style={{
        boxShadow:
          '0px 7px 17px -2px rgba(87, 84, 94, 0.12), 0px 11px 25px 4px rgba(87, 84, 94, 0.07)',
        backgroundClip: 'padding-box',
      }}
      onClick={handleClick}
    >
      <div
        className={
          ' flex items-center justify-center gap-4 bg-gradient-to-r from-[#9359F2] to-[#7784FA] bg-clip-text text-center text-2xl font-normal capitalize tracking-[0.24px] text-transparent'
        }
      >
        {children}
      </div>
    </button>
  );
};

// Main Component
const StartWithButton = () => {
  const { selectedAssistant } = useOnboarding((state) => ({
    selectedAssistant: state.selectedAssistant,
  }));

  const transOnboarding = useTranslations('Onboarding');

  return (
    <div className='absolute bottom-[60px] left-1/2 flex -translate-x-1/2  transform items-center justify-center'>
      <GradientButton>
        <Image src='/onboarding/star.svg' alt='Star' width={25} height={24} />
        {transOnboarding('Start_With', { name: selectedAssistant })}
        <Image src='/onboarding/star.svg' alt='Star' width={25} height={24} />
      </GradientButton>
    </div>
  );
};

export default StartWithButton;
