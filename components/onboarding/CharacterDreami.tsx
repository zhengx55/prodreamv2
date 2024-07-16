'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '@/components/onboarding/ProfileCard';

export const CharacterDreami = () => {
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

  const DreamiProfile = {
    avatarSrc: '/onboarding/dreami.png',
    avatarAlt: transOnboarding('Dreami.AvatarAlt'),
    name: transOnboarding('Dreami.Name'),
    description: transOnboarding('Dreami.Description'),
    background: transOnboarding('Dreami.Background'),
    skills: [
      { text: transOnboarding('Dreami.Skill_1'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Dreami.Skill_2'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Dreami.Skill_3'), color: 'text-[#7B52CC]' },
    ],
    personality: [
      {
        text: transOnboarding('Dreami.Personality_1'),
        color: 'text-[#5266CC]',
      },
      {
        text: transOnboarding('Dreami.Personality_2'),
        color: 'text-[#5266CC]',
      },
      {
        text: transOnboarding('Dreami.Personality_3'),
        color: 'text-[#5266CC]',
      },
      {
        text: transOnboarding('Dreami.Personality_4'),
        color: 'text-[#5266CC]',
      },
    ],
  };

  return (
    <>
      <AnimatePresence>
        {selectedAssistant === 'Dreami' && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                top: '43%',
                right: '-75%',
                zIndex: 40,
              }}
            >
              <ProfileCard
                avatarSrc={DreamiProfile.avatarSrc}
                avatarAlt={DreamiProfile.avatarAlt}
                name={DreamiProfile.name}
                description={DreamiProfile.description}
                background={DreamiProfile.background}
                skills={DreamiProfile.skills}
                personality={DreamiProfile.personality}
                positionStyles={{}}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '34%',
                right: '8%',
                zIndex: 40,
              }}
            >
              <Image
                src='/onboarding/DreamiIndicatorLine.svg'
                alt='Dreami'
                width={121.3}
                height={57.3}
                className='z-40'
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Image
        src={
          selectedAssistant === 'Dreami'
            ? '/onboarding/Dreami_picked.png'
            : '/onboarding/Dreami.png'
        }
        alt='centered character'
        width={212}
        height={212}
        className='absolute right-[15%] top-[24%] z-40 rotate-[15deg] transform cursor-pointer'
        onClick={() => handleClick('Dreami')}
        onDragStart={handleDragStart}
      />
    </>
  );
};
