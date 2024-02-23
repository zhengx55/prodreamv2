import Spacer from '@/components/root/Spacer';
import {
  BookHalf,
  FileCheck,
  GenerateFill,
} from '@/components/root/SvgComponents';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import useAiEditor from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { PanelRight, PanelRightClose } from 'lucide-react';
import dynamic from 'next/dynamic';
import { GrammarCheck } from './grammar/GrammarCheck';

const Generate = dynamic(
  () => import('@/components/editor/rightbar/generate/Generate')
);

const Citation = dynamic(
  () => import('@/components/editor/rightbar/citation/Citation')
);

const General = () => {
  const toggleRightbar = useAiEditor((state) => state.toggleRightbar);
  const rightbarTab = useAiEditor((state) => state.rightbarTab);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
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
      className='flex h-full shrink-0 flex-col border-l border-shadow-border'
    >
      <section className='flex h-full flex-col px-3 pt-4'>
        <PanelRightClose
          size={20}
          onClick={toggleRightbar}
          className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
        />
        <Spacer y='15' />
        <div className='flex-between w-full gap-x-2.5'>
          <AnimatePresence>
            <m.span
              onClick={() => updateRightbarTab(0)}
              initial={false}
              animate={{ width: rightbarTab === 0 ? '70%' : '15%' }}
              exit={{ width: rightbarTab === 0 ? '15%' : '70%' }}
              className={`flex-center h-11 cursor-pointer ${
                rightbarTab === 0
                  ? 'rounded-md border border-[#E7E9FF] bg-[#E7E9FF]/50'
                  : 'relative rounded-md border border-shadow-border bg-transparent'
              }`}
            >
              {rightbarTab === 0 ? (
                <>
                  <FileCheck size='18' />
                  <m.p
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.5 },
                    }}
                    className='small-semibold text-doc-primary'
                  >
                    Grammar Check
                  </m.p>
                </>
              ) : (
                <Tooltip tooltipContent='Grammar check'>
                  <div className='flex-center absolute h-full w-full'>
                    <FileCheck size='18' />
                  </div>
                </Tooltip>
              )}
            </m.span>
          </AnimatePresence>
          <AnimatePresence>
            <m.span
              onClick={() => updateRightbarTab(1)}
              initial={false}
              animate={{ width: rightbarTab === 1 ? '70%' : '15%' }}
              exit={{ width: rightbarTab === 1 ? '15%' : '70%' }}
              className={`flex-center h-11 cursor-pointer ${
                rightbarTab === 1
                  ? 'rounded border border-[#E7E9FF] bg-[#E7E9FF]/50'
                  : 'relative rounded border border-shadow-border bg-transparent'
              }`}
            >
              {rightbarTab === 1 ? (
                <>
                  <BookHalf size={'18'} />
                  <p className='small-semibold text-doc-primary'>Citation</p>
                </>
              ) : (
                <Tooltip tooltipContent='Citation'>
                  <div className='flex-center absolute h-full w-full'>
                    <BookHalf size={'18'} />
                  </div>
                </Tooltip>
              )}
            </m.span>
          </AnimatePresence>
          <AnimatePresence>
            <m.span
              onClick={() => updateRightbarTab(2)}
              initial={false}
              animate={{ width: rightbarTab === 2 ? '70%' : '15%' }}
              exit={{ width: rightbarTab === 2 ? '15%' : '70%' }}
              className={`flex-center h-11 cursor-pointer ${
                rightbarTab === 2
                  ? 'rounded border border-[#E7E9FF] bg-[#E7E9FF]/50'
                  : 'relative rounded border border-shadow-border bg-transparent'
              }`}
            >
              {rightbarTab === 2 ? (
                <>
                  <GenerateFill size='18' />
                  <p className='small-semibold text-doc-primary'>Generate</p>
                </>
              ) : (
                <Tooltip tooltipContent='Generate'>
                  <div className='flex-center absolute h-full w-full'>
                    <GenerateFill size='18' />
                  </div>
                </Tooltip>
              )}
            </m.span>
          </AnimatePresence>
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
  const toggleRightbar = useAiEditor((state) => state.toggleRightbar);
  return (
    <m.span
      key={'doc-rightbar-trigger'}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <Button
        className='absolute right-0 top-1'
        variant={'ghost'}
        onClick={toggleRightbar}
      >
        <PanelRight size={20} className='text-shadow' />
      </Button>
    </m.span>
  );
};

General.Trigger = Trigger;
export default General;
