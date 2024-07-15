'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';

export const CharacterMax = () => {
  const { selectedAssistant, setSelectedAssistant } = useOnboarding(
    (state) => ({
      selectedAssistant: state.selectedAssistant,
      setSelectedAssistant: state.setSelectedAssistant,
    })
  );

  const handleClick = (assistant: string) => {
    setSelectedAssistant(assistant);
  };

  return (
    <Image
      src={
        selectedAssistant === 'Max'
          ? '/onboarding/Max_picked.png'
          : '/onboarding/Max_not_picked.png'
      }
      alt='centered character'
      width={662}
      height={761}
      className='absolute bottom-[13%] left-[7%] z-10 cursor-pointer'
      onClick={() => handleClick('Max')}
    />
  );
};
