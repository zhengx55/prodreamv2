'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRightbar } from '@/zustand/store';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ComponentType, FC, useCallback } from 'react';

const Detection = dynamic(() => import('../detection/Detection'));
const Grammar = dynamic(() => import('../grammar/Grammar'));
const Plagiarism = dynamic(() => import('../plagiarism/Plagiarism'));
const ChatMessageList = dynamic(() => import('../chat/bar/ChatMessageList'), {
  ssr: false,
  loading: () => <div className='flex-1' />,
});
const ChatFooter = dynamic(() => import('../chat/bar/ChatFooter'));

interface ComponentConfig {
  id: number;
  name: string;
  icon: string | null;
  title: string;
  component: ComponentType | null;
  footer?: ComponentType;
}

const components: ComponentConfig[] = [
  {
    id: 0,
    name: 'Chat',
    title: 'Max',
    icon: '/workbench/nav_chat.svg',
    component: ChatMessageList,
    footer: ChatFooter,
  },
  {
    id: 1,
    name: 'Detection',
    title: 'Detection',
    icon: null,
    component: Detection,
  },
  {
    id: 2,
    name: 'Plagiarism',
    title: 'Plagiarism',
    icon: null,
    component: Plagiarism,
  },
  {
    id: 3,
    name: 'Grammar',
    title: 'Grammar',
    icon: null,
    component: Grammar,
  },
];

const Rightbar: FC<{ isDraftDetail?: boolean }> = ({ isDraftDetail }) => {
  const rightbarTab = useRightbar((state) => state.rightbarTab);
  const toggleRightbarTab = useRightbar((state) => state.setRightbarTab);

  const renderButton = useCallback(
    (
      alt: string,
      src: string,
      className: string,
      onClick: () => void,
      buttonClass?: string
    ) => (
      <Button
        role='button'
        variant={'icon'}
        onClick={onClick}
        className={cn(buttonClass, 'size-max p-2')}
      >
        <Icon
          alt={alt}
          src={src}
          width={24}
          height={24}
          className={className}
          priority
        />
      </Button>
    ),
    []
  );

  const renderContent = (tabId: number) => {
    const componentData = components.find((comp) => comp.id === tabId);
    if (!componentData) return null;

    const Component = componentData.component;
    const Footer = componentData.footer;

    return (
      <div className='flex flex-1 flex-col'>
        <div className='flex-between h-[63px] rounded-tl-lg border-b border-gray-200 bg-white px-4'>
          <div className='flex items-center gap-x-2'>
            {componentData.icon && (
              <Image
                src={componentData.icon}
                alt={componentData.name}
                width={24}
                height={24}
                className='size-6'
              />
            )}
            <h2 className='text-xl font-medium text-zinc-800'>
              {componentData.name}
            </h2>
          </div>
          {renderButton('collapse', '/workbench/collapse.svg', 'size-5', () => {
            toggleRightbarTab(tabId);
          })}
        </div>
        {Component && <Component />}
        {Footer && <Footer />}
      </div>
    );
  };

  return (
    <div className='flex'>
      <div
        className={`transition-all duration-300 ease-in-out ${
          rightbarTab !== -1
            ? 'w-[400px] rounded-bl-lg rounded-tl-lg'
            : 'w-0 rounded-bl-lg rounded-tl-lg'
        } flex flex-1 overflow-hidden bg-slate-100`}
      >
        {renderContent(rightbarTab)}
      </div>
      <div
        className={`flex h-full w-[60px] flex-col items-center ${
          rightbarTab !== -1
            ? 'rounded-br-lg rounded-tr-lg'
            : 'rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-lg'
        } border-l border-gray-200 bg-white pt-6 transition-all duration-300 ease-in-out`}
      >
        <ul className='space-y-6'>
          {isDraftDetail ? (
            components.map((comp) => (
              <li key={comp.id}>
                {renderButton(
                  `${comp.name.toLowerCase()}`,
                  `${rightbarTab === comp.id ? `/workbench/${comp.name.toLowerCase()}_trigger.svg` : `/workbench/${comp.name.toLowerCase()}_trigger_unselected.svg`}`,
                  'size-6',
                  () => toggleRightbarTab(comp.id),
                  `${rightbarTab !== comp.id ? '' : 'bg-slate-200'}`
                )}
              </li>
            ))
          ) : (
            <li>
              {renderButton(
                `${components[0].name.toLowerCase()}`,
                `${rightbarTab === components[0].id ? `/workbench/${components[0].name.toLowerCase()}_trigger.svg` : `/workbench/${components[0].name.toLowerCase()}_trigger_unselected.svg`}`,
                'size-6',
                () => toggleRightbarTab(components[0].id),
                `${rightbarTab !== components[0].id ? '' : 'bg-slate-200'}`
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
