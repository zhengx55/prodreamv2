'use client';

import Spacer from '@/components/root/Spacer';
import { BookHalf, GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from 'framer-motion';
import { FileCheck, PanelRight, PanelRightClose } from 'lucide-react';
import { memo, useState } from 'react';

const OptionsVariants: Variants = {
  expanded: { width: '312px' },
  collasped: { width: '66px' },
};

type Props = {
  show: boolean;
  toggle: (value: boolean) => void;
};
const DocRightBar = ({ show, toggle }: Props) => {
  const [selected, setSelected] = useState(0);
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {show && (
          <m.aside
            key={'doc-right-bar'}
            initial={{ width: 0 }}
            animate={{
              width: 500,
              transition: { duration: 0.2, delay: 0.1 },
            }}
            exit={{
              width: 0,
              transition: { duration: 0.2 },
            }}
            className='flex h-full flex-col border-l border-shadow-border'
          >
            <section className='flex min-h-full flex-col overflow-y-auto px-3 py-4'>
              <PanelRightClose
                size={20}
                onClick={() => toggle(false)}
                className='cursor-pointer text-shadow hover:opacity-50'
              />
              <Spacer y='15' />
              <div className='flex-between w-full gap-x-4'>
                <m.span
                  onClick={() => setSelected(0)}
                  initial={false}
                  variants={OptionsVariants}
                  animate={selected === 0 ? 'expanded' : 'collasped'}
                  className={`${
                    selected === 0
                      ? 'bg-doc-primary'
                      : 'border border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
                >
                  <FileCheck
                    className={`${
                      selected === 0 ? 'text-white' : 'text-doc-primary'
                    }`}
                  />
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
                      : 'border border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
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
                      : 'border border-doc-primary bg-transparent'
                  }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
                >
                  <GenerateFill fill={selected !== 2 ? '#8652DB' : '#FFFFFF'} />
                  {selected === 2 && (
                    <p className='title-semibold text-white'>Generate</p>
                  )}
                </m.span>
              </div>
            </section>
          </m.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!show && (
          <m.span
            key={'doc-rightbar-trigger'}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.2, delay: 0.2 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
};
export default memo(DocRightBar);
