'use client';
import Image from 'next/image';

// Avatar Component
const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    width={60}
    height={66}
    className={'mr-4 h-20 w-20 rounded-full'}
  />
);

// Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className={'mb-6'}>
    <h3 className={'mb-1 text-lg font-semibold'}>{title}</h3>
    {children}
  </div>
);

// Badge Component
const Badge = ({ text, color }: { text: string; color: string }) => (
  <span
    className={`${color} rounded-md bg-white px-3 py-1 text-sm font-medium`}
  >
    {text}
  </span>
);

// Main Component
const ProfileCard = ({
  avatarSrc,
  avatarAlt,
  name,
  description,
  background,
  skills,
  personality,
}: {
  avatarSrc: string;
  avatarAlt: string;
  name: string;
  description: string;
  background: string;
  skills: { text: string; color: string }[];
  personality: { text: string; color: string }[];
}) => {
  return (
    <div
      className={
        'absolute left-[-200px] z-30 mx-auto max-w-md rounded-md border border-white bg-white/50 p-6 backdrop-blur-lg backdrop-filter'
      }
    >
      <div className={`mb-6 flex items-center`}>
        <Avatar src={avatarSrc} alt={avatarAlt} />
        <div>
          <h2 className='text-xl font-bold'>{name}</h2>
          <p className={'text-zinc-700'}>{description}</p>
        </div>
      </div>

      <Section title='Background'>
        <p className={'text-zinc-700'}>{background}</p>
      </Section>

      <Section title='Skill'>
        <div className={'flex flex-wrap gap-2'}>
          {skills.map((skill, index) => (
            <Badge key={index} text={skill.text} color={skill.color} />
          ))}
        </div>
      </Section>

      <Section title='Personality'>
        <div className={'flex flex-wrap gap-2'}>
          {personality.map((trait, index) => (
            <Badge key={index} text={trait.text} color={trait.color} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ProfileCard;
