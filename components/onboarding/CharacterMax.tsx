'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
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
      <AnimatePresence>
        {selectedAssistant === 'Max' && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'relative', top: '13%', left: '-15%' }}
            >
              <ProfileCard
                avatarSrc={MaxProfile.avatarSrc}
                avatarAlt={MaxProfile.avatarAlt}
                name={MaxProfile.name}
                description={MaxProfile.description}
                background={MaxProfile.background}
                skills={MaxProfile.skills}
                personality={MaxProfile.personality}
                positionStyles={{}}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', top: '25%', left: '23%' }}
            >
              <Image
                src='/onboarding/MaxIndicatorLine.svg'
                alt='Max'
                width={121.3}
                height={57.3}
                className='z-10'
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
