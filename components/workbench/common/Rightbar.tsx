'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRightbar } from '@/zustand/store';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { ComponentType, useCallback, useEffect } from 'react';
const GenerateOutline = dynamic(() => import('../chat/modal/GenerateOutline'));
const PolishOutline = dynamic(() => import('../chat/modal/PolishOutline'));
const GenerateDraft = dynamic(() => import('../chat/modal/GenerateDraft'));
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

const Rightbar = () => {
  const rightbarTab = useRightbar((state) => state.rightbarTab);
  const toggleRightbarTab = useRightbar((state) => state.setRightbarTab);
  const pathName = usePathname();
  const { id } = useParams();
  const isDraftDetail =
    pathName.includes('/draft/create') || (id && pathName.includes('/draft'));

  const isChatPage = pathName.includes('/chat');

  useEffect(() => {
    if (!isDraftDetail && rightbarTab !== 0 && rightbarTab !== -1) {
      toggleRightbarTab(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDraftDetail, rightbarTab]);

  const renderButton = useCallback(
    (
      alt: string,
      src: string,
      className: string,
      onClick: () => void,
      buttonClass?: string,
      labelClass?: string
    ) => (
      <div className='flex flex-col items-center gap-y-1'>
        <Button
          variant={'icon'}
          onClick={onClick}
          className={cn(buttonClass, 'size-max rounded-lg p-2')}
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
        <p className={cn(labelClass, 'text-center text-xs')}>{alt}</p>
      </div>
    ),
    []
  );

  const renderContent = (tabId: number) => {
    const componentData = components.find((comp) => comp.id === tabId);
    if (!componentData) return null;

    const Component = componentData.component;
    const Footer = componentData.footer;

    return (
      <div className='flex flex-1 flex-col overflow-x-hidden'>
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
          <Button
            variant={'icon'}
            onClick={() => toggleRightbarTab(tabId)}
            className='p-0.5'
          >
            <Icon
              alt='close'
              src='/workbench/collapse.svg'
              width={24}
              height={24}
              className='size-5'
              priority
            />
          </Button>
        </div>
        {Component && <Component />}
        {Footer && <Footer />}
      </div>
    );
  };

  if (isChatPage) return null;

  return (
    <div className='flex'>
      <div
        className={`transition-all duration-300 ease-in-out ${
          rightbarTab !== -1
            ? 'w-[400px] rounded-bl-lg rounded-tl-lg'
            : 'w-0 rounded-bl-lg rounded-tl-lg'
        } flex flex-1 overflow-hidden bg-[#F6F7FB]`}
      >
        {renderContent(rightbarTab)}
      </div>
      <GenerateOutline />
      <PolishOutline />
      <GenerateDraft />
      <div
        className={`flex h-full w-[72px] flex-col items-center ${
          rightbarTab !== -1
            ? 'rounded-br-lg rounded-tr-lg'
            : 'rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-lg'
        } border-l border-gray-200 bg-white pt-3 transition-all duration-300 ease-in-out`}
      >
        <ul className='space-y-4'>
          {isDraftDetail ? (
            components.map((comp) => (
              <li key={comp.id}>
                {renderButton(
                  `${comp.name.toLowerCase()}`,
                  `${rightbarTab === comp.id ? `/workbench/${comp.name.toLowerCase()}_trigger.svg` : `/workbench/${comp.name.toLowerCase()}_trigger_unselected.svg`}`,
                  'size-6',
                  () => toggleRightbarTab(comp.id),
                  `${rightbarTab !== comp.id ? '' : 'bg-slate-200'}`,
                  `${rightbarTab !== comp.id ? '' : 'text-indigo-500'}`
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
                `${rightbarTab !== components[0].id ? '' : 'bg-slate-200'}`,
                `${rightbarTab !== components[0].id ? '' : 'text-indigo-500'}`
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
