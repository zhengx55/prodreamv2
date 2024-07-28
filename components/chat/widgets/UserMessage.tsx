'use client';
import { ReactNode } from 'react';
import HoveringBar from './HoveringBar';

interface AvatarProps {
  src: string;
}

interface ContentProps {
  children: ReactNode;
  maxWidth?: number;
  fontSize?: string;
}

interface UserMessageProps {
  avatarProps: AvatarProps;
  content: string;
  fontSize?: string;
}

// Avatar Component
const Avatar = ({ src }: AvatarProps) => {
  return (
    <div
      className='ml-2 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};

// Content Component
const Content = ({
  children,
  maxWidth = 560,
  fontSize = '16px',
}: ContentProps) => {
  return (
    <div
      className='ml-9 inline-flex flex-col items-end justify-center gap-2 rounded-lg bg-[#7270E8] p-4'
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div
        className='self-stretch font-poppins font-normal leading-7 text-white'
        style={{ fontSize: fontSize }}
      >
        {children}
      </div>
    </div>
  );
};

// Main Component
const UserMessage = ({ avatarProps, content, fontSize }: UserMessageProps) => {
  return (
    <>
      <div className='flex flex-row-reverse items-start px-4 pt-4'>
        <Avatar {...avatarProps} />
        <Content fontSize={fontSize}>{content}</Content>
      </div>
      <div className='flex pr-[54px]'>
        <HoveringBar
          alignment='right'
          showCopy={true}
          showRegeneration={false}
          showLike={false}
          showDislike={false}
          onCopy={() => console.log('Copy clicked')}
        />
      </div>
    </>
  );
};

export default UserMessage;
