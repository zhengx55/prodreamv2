'use client';

import Spacer from '@/components/root/Spacer';
import {
  BookHalf,
  FileCheck,
  GenerateFill,
} from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import useAiEditor from '@/zustand/store';
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from 'framer-motion';
import { PanelRight, PanelRightClose } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { GrammarCheck } from './grammar/GrammarCheck';

const Generate = dynamic(() =>
  import('@/components/editor/rightbar').then((mod) => mod.Generate)
);

const Citation = dynamic(() =>
  import('@/components/editor/rightbar').then((mod) => mod.Citation)
);

const OptionsVariants: Variants = {
  expanded: { width: '70%' },
  collasped: { width: '15%' },
};

const DocRightBar = memo(() => {
  const rightbarOpen = useAiEditor((state) => state.rightbarOpen);
  const toggleRightbar = useAiEditor((state) => state.toggleRightbar);
  const righbarTab = useAiEditor((state) => state.righbarTab);
  const updateRightbarTab = useAiEditor((state) => state.updateRightbarTab);
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode='wait'>
        {rightbarOpen ? (
          <m.aside
            key={'doc-right-bar'}
            initial={{ width: 0 }}
            animate={{
              width: 500,
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
                <m.span
                  onClick={() => updateRightbarTab(0)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={righbarTab === 0 ? 'expanded' : 'collasped'}
                  className={`${
                    righbarTab === 0
                      ? 'bg-doc-primary'
                      : 'border-2 border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
                >
                  <FileCheck color={righbarTab === 0 ? 'white' : '#8652DB'} />
                  <AnimatePresence>
                    {righbarTab === 0 && (
                      <m.p
                        key={'rightbar-grammar-check'}
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.5 },
                        }}
                        className='title-semibold text-white'
                      >
                        Grammar Check
                      </m.p>
                    )}
                  </AnimatePresence>
                </m.span>
                <m.span
                  onClick={() => updateRightbarTab(1)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={righbarTab === 1 ? 'expanded' : 'collasped'}
                  className={`${
                    righbarTab === 1
                      ? 'bg-doc-primary'
                      : 'border-2 border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded `}
                >
                  <BookHalf fill={righbarTab !== 1 ? '#8652DB' : '#FFFFFF'} />
                  {righbarTab === 1 && (
                    <p className='title-semibold text-white'>Citation</p>
                  )}
                </m.span>
                <m.span
                  onClick={() => updateRightbarTab(2)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={righbarTab === 2 ? 'expanded' : 'collasped'}
                  className={`${
                    righbarTab === 2
                      ? 'bg-doc-primary'
                      : 'border-2 border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded `}
                >
                  <GenerateFill
                    fill={righbarTab !== 2 ? '#8652DB' : '#FFFFFF'}
                  />
                  {righbarTab === 2 && (
                    <p className='title-semibold text-white'>Generate</p>
                  )}
                </m.span>
              </div>
              <Spacer y='15' />
              {righbarTab === 0 ? (
                <GrammarCheck />
              ) : righbarTab === 1 ? (
                <Citation />
              ) : righbarTab === 2 ? (
                <Generate />
              ) : null}
            </section>
          </m.aside>
        ) : (
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
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

DocRightBar.displayName = 'DocRightBar';
export default DocRightBar;
