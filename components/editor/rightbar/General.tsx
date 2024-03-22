import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import { EditorRightBar } from '@/constant';
import { useAIEditor } from '@/zustand/store';
import { m } from 'framer-motion';
import { XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { GrammarCheck } from './grammar/GrammarCheck';

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
      animate={{
        width: 400,
      }}
      exit={{
        width: 0,
      }}
      transition={{ duration: 0.2 }}
      className='flex h-full shrink-0 flex-col border-l border-gray-200'
    >
      <section className='flex h-full flex-col px-3 pt-4'>
        <div className='flex-between'>
          <h2 className='title-medium'>
            {rightbarTab === 0
              ? 'Grammar Check'
              : rightbarTab === 1
                ? 'Citation'
                : rightbarTab === 2
                  ? 'Generate'
                  : rightbarTab === 3
                    ? 'Plagiarism Check'
                    : 'AI Detection'}
          </h2>
          <XCircle
            size={20}
            onClick={toggleRightbar}
            className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
          />
        </div>
        <Spacer y='15' />
        {rightbarTab === 0 ? (
          <GrammarCheck />
        ) : rightbarTab === 1 ? (
          <Citation />
        ) : rightbarTab === 2 ? (
          <Generate />
        ) : null}
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
        <>
          {(index === 3 || index === 5) && (
            <Separator orientation='horizontal' className='bg-gray-200' />
          )}
          <li
            onClick={() => {
              updateRightbarTab(index);
            }}
            key={item.id}
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
        </>
      ))}
    </m.ul>
  );
};

General.Trigger = Trigger;
export default General;
