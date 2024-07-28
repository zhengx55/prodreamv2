'use client';
import Image from 'next/image';
import { useOnboarding } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from '@/components/onboarding/ProfileCard';

export const CharacterJessica = () => {
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

  const JessicaProfile = {
    avatarSrc: '/onboarding/JessicaAvatar.png',
    avatarAlt: transOnboarding('Jessica.AvatarAlt'),
    name: transOnboarding('Jessica.Name'),
    description: transOnboarding('Jessica.Description'),
    background: transOnboarding('Jessica.Background'),
    skills: [
      { text: transOnboarding('Jessica.Skill_1'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Jessica.Skill_2'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Jessica.Skill_3'), color: 'text-[#7B52CC]' },
      { text: transOnboarding('Jessica.Skill_4'), color: 'text-[#7B52CC]' },
    ],
    personality: [
      {
        text: transOnboarding('Jessica.Personality_1'),
        color: 'text-[#5266CC]',
      },
      {
        text: transOnboarding('Jessica.Personality_2'),
        color: 'text-[#5266CC]',
      },
      {
        text: transOnboarding('Jessica.Personality_3'),
        color: 'text-[#5266CC]',
      },
    ],
  };

  return (
    <>
      <AnimatePresence>
        {selectedAssistant === 'Jessica' && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                top: '33%',
                right: '-75%',
                zIndex: 40,
              }}
            >
              <ProfileCard
                avatarSrc={JessicaProfile.avatarSrc}
                avatarAlt={JessicaProfile.avatarAlt}
                name={JessicaProfile.name}
                description={JessicaProfile.description}
                background={JessicaProfile.background}
                skills={JessicaProfile.skills}
                personality={JessicaProfile.personality}
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
                top: '48%',
                right: '28%',
                zIndex: 40,
              }}
            >
              <Image
                src='/onboarding/JessicaIndicatorLine.svg'
                alt='Jessica'
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
    </>
  );
};
