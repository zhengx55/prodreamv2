import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Separator } from '@/components/ui/separator';
import { EditorRightBar } from '@/constant';
import { CitationTooltip } from '@/constant/enum';
import { DocPageDicType } from '@/types';
import { useAIEditor, useUserTask } from '@/zustand/store';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import Tiplayout from '../guide/tips/Tiplayout';
import Chatbot from './Chatbot';
const Detection = dynamic(() => import('./ai-detection/Detection'));
const CitationLibrary = dynamic(
  () => import('./citation/library/CitationLibrary')
);
const GrammarCheck = dynamic(() => import('./grammar/GrammarCheck'));
const Plagiarism = dynamic(() => import('./plagiarism/Plagiarism'));
const Generate = dynamic(
  () => import('@/components/editor/rightbar/generate/Generate')
);

const Citation = dynamic(
  () => import('@/components/editor/rightbar/citation/Citation')
);

const General = ({ t, lang }: DocPageDicType) => {
  const rightbarTab = useAIEditor((state) => state.rightbarTab);

  return (
    <m.aside
      key={'doc-right-bar'}
      initial={{ width: 0 }}
      animate={{ width: 400 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.2 }}
      className='flex h-full shrink-0 flex-col border-l border-gray-200'
    >
      <section className='relative flex h-full flex-col px-3 pt-4'>
        {rightbarTab === 0 ? (
          <GrammarCheck t={t} />
        ) : rightbarTab === 3 ? (
          <Citation t={t} />
        ) : rightbarTab === 5 ? (
          <Generate t={t} />
        ) : rightbarTab === 1 ? (
          <Plagiarism t={t} />
        ) : rightbarTab === 2 ? (
          <Detection t={t} />
        ) : rightbarTab === 4 ? (
          <CitationLibrary t={t} />
        ) : (
          <Chatbot t={t} />
        )}
      </section>
    </m.aside>
  );
};

const Trigger = ({ t, lang }: DocPageDicType) => {
  const { updateRightbarTab, rightbarTab, rightbarOpen } = useAIEditor(
    (state) => ({ ...state })
  );
  const resetCitationStep = useUserTask((state) => state.resetCitationStep);
  const citation_tooltip_step = useUserTask((state) => state.citation_step);

  return (
    <m.ul
      animate={{ right: rightbarOpen ? '408px' : '12px' }}
      initial={false}
      className='absolute top-2 flex flex-col items-center gap-y-4 rounded border border-gray-200 bg-white px-1.5 py-2'
    >
      {EditorRightBar.map((item, index) => (
        <Fragment key={item.id}>
          {(index === 3 || index === 5) && (
            <Separator orientation='horizontal' className='bg-gray-200' />
          )}
          {index === 4 ? (
            citation_tooltip_step === 4 ? (
              <Tiplayout
                title={CitationTooltip.STEP4_TITLE}
                content={CitationTooltip.STEP4_TEXT}
                step={citation_tooltip_step}
                side='top'
                totalSteps={4}
                buttonLabel='done'
                onClickCallback={() => {
                  resetCitationStep();
                }}
              >
                <li
                  onClick={() => {
                    updateRightbarTab(index);
                  }}
                  className='cursor-pointer hover:opacity-70'
                >
                  <Icon
                    alt=''
                    src={
                      rightbarTab === index && rightbarOpen
                        ? item.active_icon
                        : item.icon
                    }
                    priority
                    width={24}
                    height={24}
                  />
                </li>
              </Tiplayout>
            ) : (
              <TriggerItem
                onClick={() => {
                  updateRightbarTab(index);
                }}
                item={item}
                label={t.RightBar[item.title as keyof typeof t.RightBar]}
                isActive={rightbarTab === index && rightbarOpen}
              />
            )
          ) : (
            <TriggerItem
              onClick={() => {
                updateRightbarTab(index);
              }}
              item={item}
              label={t.RightBar[item.title as keyof typeof t.RightBar]}
              isActive={rightbarTab === index && rightbarOpen}
            />
          )}
        </Fragment>
      ))}
    </m.ul>
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
