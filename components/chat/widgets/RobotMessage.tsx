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

interface RobotChatProps {
  avatarProps: AvatarProps;
  content: ReactNode;
  fontSize?: string;
}

// Avatar Component
const Avatar = ({ src }: AvatarProps) => {
  return (
    <div
      className='mr-2 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 bg-cover bg-center bg-no-repeat'
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
      className='mr-9 flex flex-col items-end justify-center gap-2 rounded-[10px] bg-[#F6F7FB] p-4'
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div
        className='self-stretch font-poppins font-normal leading-7 text-[#57545E]'
        style={{ fontSize: fontSize }}
      >
        {children}
      </div>
    </div>
  );
};

// Main Component
const RobotChat = ({ avatarProps, content, fontSize }: RobotChatProps) => {
  return (
    <>
      <div className='flex items-start px-4 pt-4'>
        <Avatar {...avatarProps} />
        <Content fontSize={fontSize}>{content}</Content>
      </div>
      <div className='flex pl-[54px]'>
        <HoveringBar
          showCopy={true}
          showRegeneration={true}
          showLike={true}
          showDislike={true}
          onCopy={() => console.log('Copy clicked')}
          onRegeneration={() => console.log('Regeneration clicked')}
          onLike={() => console.log('Like clicked')}
          onDislike={() => console.log('Dislike clicked')}
        />
      </div>
    </>
  );
};

export default RobotChat;