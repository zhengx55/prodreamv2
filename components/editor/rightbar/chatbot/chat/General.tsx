import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { EditorRightBar } from '@/constant';
import { DocPageDicType } from '@/types';
import { useAIEditor, useChatbot } from '@/zustand/store';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import ResearchChat from '../research/ResearchChat';
const Detection = dynamic(() => import('../../ai-detection/Detection'));
const CitationLibrary = dynamic(
  () => import('../../citation/library/CitationLibrary')
);
const GrammarCheck = dynamic(() => import('../../grammar/GrammarCheck'));
const Plagiarism = dynamic(() => import('../../plagiarism/Plagiarism'));
const Generate = dynamic(
  () => import('@/components/editor/rightbar/generate/Generate')
);
const Chatbot = dynamic(() => import('../Chatbot'));

const Citation = dynamic(
  () => import('@/components/editor/rightbar/citation/Citation')
);

const tabComponents: { [key: number]: React.ComponentType<any> } = {
  0: GrammarCheck,
  1: Plagiarism,
  2: Detection,
  3: Citation,
  4: CitationLibrary,
  5: Generate,
};

const General = ({ t, lang }: DocPageDicType) => {
  const trans = useTranslations('Editor');
  const rightbarTab = useAIEditor((state) => state.rightbarTab);
  const chatType = useChatbot((state) => state.chatType);
  const TabContent =
    rightbarTab === 6
      ? chatType === 'research'
        ? ResearchChat
        : Chatbot
      : tabComponents[rightbarTab];
  return (
    <m.aside
      key={'doc-right-bar'}
      initial={{ width: 0 }}
      animate={{ width: 400 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.2 }}
      className='relative flex h-full shrink-0 flex-col border-l border-gray-200'
      style={{ height: 'calc(100vh - var(--top-nav-bar-height))' }}
    >
      <section className='relative flex h-full flex-col px-3 pt-4'>
        {TabContent ? <TabContent t={t} /> : null}
      </section>
    </m.aside>
  );
};

const Trigger = ({ t, lang }: DocPageDicType) => {
  const trans = useTranslations('Editor');
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const rightbarTab = useAIEditor((state) => state.rightbarTab);
  const rightbarOpen = useAIEditor((state) => state.rightbarOpen);

  return (
    <m.aside
      initial={false}
      animate={{ right: rightbarOpen ? '408px' : '12px' }}
      className='absolute top-2 flex flex-col gap-y-2'
    >
      <ul className='flex flex-col items-center gap-y-4 rounded border border-gray-200 bg-white px-1.5 py-2'>
        {EditorRightBar.map((item, index) => (
          <Fragment key={item.id}>
            {(index === 3 || index === 5) && (
              <Separator orientation='horizontal' className='bg-gray-200' />
            )}

            <TriggerItem
              onClick={() => {
                updateRightbarTab(index);
              }}
              item={item}
              label={trans(`RightBar.${item.title}`)}
              isActive={rightbarTab === index && rightbarOpen}
            />
          </Fragment>
        ))}
      </ul>

      <Button
        className='z-50 size-max cursor-pointer border border-gray-200 bg-transparent p-1'
        role='button'
        variant={'icon'}
        onClick={() => updateRightbarTab(6)}
      >
        <Icon
          src='/editor/chatbot/Jessica.png'
          alt='trigger_chat'
          height={28}
          width={28}
          priority
          className='size-7'
        />
      </Button>
    </m.aside>
  );
};

const TriggerItem = ({
  onClick,
  item,
  label,
  isActive,
}: {
  onClick: () => void;
  item: any;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Tooltip side='left' tooltipContent={label}>
      <li onClick={onClick} className='cursor-pointer hover:opacity-70'>
        <Icon
          alt=''
          src={isActive ? item.active_icon : item.icon}
          priority
          width={24}
          height={24}
        />
      </li>
    </Tooltip>
  );
};

General.Trigger = Trigger;
export default General;
