'use client';

import Spacer from '@/components/root/Spacer';
import {
  BookHalf,
  FileCheck,
  GenerateFill,
} from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from 'framer-motion';
import { PanelRight, PanelRightClose } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
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

type Props = {
  show: boolean;
  toggle: (value: boolean) => void;
};
export const DocRightBar = memo(({ show, toggle }: Props) => {
  const [selected, setSelected] = useState(0);
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode='wait'>
        {show ? (
          <m.aside
            key={'doc-right-bar'}
            initial={{ width: 0 }}
            animate={{
              width: 500,
            }}
            exit={{
              width: 0,
            }}
            className='flex h-full shrink-0 flex-col border-l border-shadow-border'
          >
            <section className='flex h-full flex-col px-3 pt-4'>
              <PanelRightClose
                size={20}
                onClick={() => toggle(false)}
                className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
              />
              <Spacer y='15' />
              <div className='flex-between w-full gap-x-2.5'>
                <m.span
                  onClick={() => setSelected(0)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={selected === 0 ? 'expanded' : 'collasped'}
                  className={`${
                    selected === 0
                      ? 'bg-doc-primary'
                      : 'border-2 border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
                >
                  <FileCheck color={selected === 0 ? 'white' : '#8652DB'} />
                  <AnimatePresence>
                    {selected === 0 && (
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
                  onClick={() => setSelected(1)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={selected === 1 ? 'expanded' : 'collasped'}
                  className={`${
                    selected === 1
                      ? 'bg-doc-primary'
                      : 'border-2 border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded `}
                >
                  <BookHalf fill={selected !== 1 ? '#8652DB' : '#FFFFFF'} />
                  {selected === 1 && (
                    <p className='title-semibold text-white'>Citation</p>
                  )}
                </m.span>
                <m.span
                  onClick={() => setSelected(2)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={selected === 2 ? 'expanded' : 'collasped'}
                  className={`${
                    selected === 2
                      ? 'bg-doc-primary'
                      : 'border-2 border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded `}
                >
                  <GenerateFill fill={selected !== 2 ? '#8652DB' : '#FFFFFF'} />
                  {selected === 2 && (
                    <p className='title-semibold text-white'>Generate</p>
                  )}
                </m.span>
              </div>
              <Spacer y='15' />
              {selected === 0 ? (
                <GrammarCheck />
              ) : selected === 1 ? (
                <Citation />
              ) : selected === 2 ? (
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
              onClick={() => toggle(true)}
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
