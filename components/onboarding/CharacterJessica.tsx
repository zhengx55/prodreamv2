'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import ProfileCard from '@/components/onboarding/ProfileCard';

export const CharacterJessica = () => {
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
        selectedAssistant === 'Jessica'
          ? '/onboarding/Jessica_picked.png'
          : '/onboarding/Jessica_not_picked.png'
      }
      alt='centered character'
      width={605}
      height={799}
      className='absolute bottom-[6%] right-[15%] z-20 cursor-pointer'
      onClick={() => handleClick('Jessica')}
      onDragStart={handleDragStart}
    />
  );
};
