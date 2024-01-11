'use client';

import Spacer from '@/components/root/Spacer';
import { BookHalf, GenerateFill } from '@/components/root/SvgComponents';
import { LazyMotion, Variants, domAnimation, m } from 'framer-motion';
import { PanelRightClose } from 'lucide-react';
import { memo, useState } from 'react';

const MenuVariants: Variants = {
  expanded: { width: '83.333333%' },
  collasped: { width: '16.666667%' },
};

type Props = {};
const DocRightBar = (props: Props) => {
  const [selected, setSelected] = useState(0);
  return (
    <LazyMotion features={domAnimation}>
      <aside className='flex min-h-full w-[300px] flex-col overflow-y-auto border-l border-shadow-border px-4 py-3'>
        <PanelRightClose className='cursor-pointer text-shadow hover:opacity-50' />
        <Spacer y='15' />
        <div className='flex-between w-full gap-x-4'>
          <m.span
            onClick={() => setSelected(0)}
            initial={false}
            variants={MenuVariants}
            animate={selected === 0 ? 'expanded' : 'collasped'}
            className={`${
              selected === 0
                ? 'bg-doc-primary'
                : 'border border-doc-primary bg-transparent'
            }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
          >
            <BookHalf fill={selected === 1 ? '#774EBB' : '#FFFFFF'} />
            {selected === 0 && <p className='h3-bold text-white'>Citation</p>}
          </m.span>
          <m.span
            onClick={() => setSelected(1)}
            initial={false}
            variants={MenuVariants}
            animate={selected === 1 ? 'expanded' : 'collasped'}
            className={`${
              selected === 1
                ? 'w-5/6 bg-doc-primary'
                : 'w-1/6 border border-doc-primary bg-transparent'
            }  flex-center h-11 cursor-pointer gap-x-2 rounded-md `}
          >
            <GenerateFill fill={selected === 0 ? '#774EBB' : '#FFFFFF'} />
            {selected === 1 && <p className='h3-bold text-white'>Generate</p>}
          </m.span>
        </div>
      </aside>
    </LazyMotion>
  );
};
export default memo(DocRightBar);
