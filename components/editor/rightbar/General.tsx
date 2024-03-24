import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Separator } from '@/components/ui/separator';
import { EditorRightBar } from '@/constant';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import { XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import Detection from './ai-detection/Detection';
import CitationLibrary from './citation/library/CitationLibrary';
import { GrammarCheck } from './grammar/GrammarCheck';
import Plagiarism from './plagiarism/Plagiarism';
const OPTIONS = [
  'Grammar Check',
  'Plagiarism Check',
  'AI Detection',
  'Citation',
  'Library',
  'Generate',
];

const Generate = dynamic(
  () => import('@/components/editor/rightbar/generate/Generate')
);

const Citation = dynamic(
  () => import('@/components/editor/rightbar/citation/Citation')
);

const General = () => {
  const toggleRightbar = useAIEditor((state) => state.toggleRightbar);
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
      <section className='flex h-full flex-col px-3 pt-4'>
        <div className='flex-between'>
          <h2 className='title-medium'>{OPTIONS[rightbarTab]}</h2>
          <XCircle
            size={20}
            onClick={toggleRightbar}
            className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
          />
        </div>
        <Spacer y='15' />
        {rightbarTab === 0 ? (
          <GrammarCheck />
        ) : rightbarTab === 3 ? (
          <Citation />
        ) : rightbarTab === 5 ? (
          <Generate />
        ) : rightbarTab === 1 ? (
          <Plagiarism />
        ) : rightbarTab === 2 ? (
          <Detection />
        ) : (
          <CitationLibrary />
        )}
      </section>
    </m.aside>
  );
};

const Trigger = () => {
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const rightbarTab = useAIEditor((state) => state.rightbarTab);
  const rightbarOpen = useAIEditor((state) => state.rightbarOpen);
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
          <Tooltip side='left' tooltipContent={item.title}>
            <li
              onClick={() => {
                updateRightbarTab(index);
              }}
              className='cursor-pointer hover:opacity-70'
            >
              <Icon
                alt=''
                src={rightbarTab === index ? item.active_icon : item.icon}
                priority
                width={24}
                height={24}
              />
            </li>
          </Tooltip>
        </Fragment>
      ))}
    </m.ul>
  );
};

General.Trigger = Trigger;
export default General;
