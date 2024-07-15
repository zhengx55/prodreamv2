'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';

export const CharacterDreami = () => {
  const { selectedAssistant, setSelectedAssistant } = useOnboarding(
    (state) => ({
      selectedAssistant: state.selectedAssistant,
      setSelectedAssistant: state.setSelectedAssistant,
    })
  );

  const handleClick = (assistant: string) => {
    setSelectedAssistant(assistant);
  };

  const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  return (
    <Image
      src={
        selectedAssistant === 'Dreami'
          ? '/onboarding/dreami_picked.png'
          : '/onboarding/dreami.png'
      }
      alt='centered character'
      width={212}
      height={212}
      className='absolute right-[15%] top-[24%] z-20 rotate-[15deg] transform cursor-pointer'
      onClick={() => handleClick('Dreami')}
      onDragStart={handleDragStart}
    />
  );
};
