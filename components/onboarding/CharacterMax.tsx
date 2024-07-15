'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import ProfileCard from '@/components/onboarding/ProfileCard';

export const CharacterMax = () => {
  const transOnboarding = useTranslations('Onboarding');
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

  const MaxProfile = {
    avatarSrc: '/onboarding/MaxAvatar.png',
    avatarAlt: transOnboarding('Max.AvatarAlt'),
    name: transOnboarding('Max.Name'),
    description: transOnboarding('Max.Description'),
    background: transOnboarding('Max.Background'),
    skills: [
      { text: transOnboarding('Max.Skill_1'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Max.Skill_2'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Max.Skill_3'), color: 'text-[#7B52CC]' },
    ],
    personality: [
      { text: transOnboarding('Max.Personality_1'), color: 'text-[#5266CC]' },
      { text: transOnboarding('Max.Personality_2'), color: 'text-[#5266CC]' },
      { text: transOnboarding('Max.Personality_3'), color: 'text-[#5266CC]' },
    ],
  };

  return (
    <>
      <ProfileCard
        avatarSrc={MaxProfile.avatarSrc}
        avatarAlt={MaxProfile.avatarAlt}
        name={MaxProfile.name}
        description={MaxProfile.description}
        background={MaxProfile.background}
        skills={MaxProfile.skills}
        personality={MaxProfile.personality}
      />
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
        onDragStart={handleDragStart}
      />
    </>
  );
};
