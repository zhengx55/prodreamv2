import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { GenerateOptions } from '@/constant';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronUp, FileText } from 'lucide-react';
import { memo, useState } from 'react';

type Props = {};
export const Generate = memo((props: Props) => {
  const [generateTab, setGenerateTab] = useState(1);
  const [outlineSubmenu, setOutlineSubmenu] = useState(false);
  return (
    <LazyMotionProvider>
      <AnimatePresence mode='wait' initial={false}>
        {generateTab === -1 && (
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            key='generate-panel'
            className='flex w-full flex-col overflow-hidden'
          >
            {GenerateOptions.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setGenerateTab(index)}
                className='flex-between group cursor-pointer px-2.5 py-3 hover:bg-doc-secondary'
              >
                <div className='flex items-center gap-x-3'>
                  <FileText
                    className='text-doc-font group-hover:text-doc-primary'
                    size={20}
                  />
                  <p className='base-regular text-doc-font group-hover:text-doc-primary'>
                    {item.title}
                  </p>
                </div>
                {item.submenu && (
                  <ChevronUp
                    className='text-doc-font group-hover:text-doc-primary'
                    size={20}
                  />
                )}
              </div>
            ))}
          </m.div>
        )}
        {generateTab !== -1 && (
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className='flex h-full w-full flex-col overflow-hidden'
            key='generate-detail'
          >
            <div
              onClick={() => setGenerateTab(-1)}
              className='flex cursor-pointer items-center gap-x-3 px-2 hover:underline'
            >
              <ChevronLeft size={20} className='text-doc-font' />
              <p className='text-doc-font base-regular'>
                {generateTab === 0
                  ? 'Write Introduction'
                  : generateTab === 1
                    ? 'Write Conclusion'
                    : generateTab === 2
                      ? 'Generate title'
                      : 'Generate Outline'}
              </p>
            </div>
            <div className='flex min-h-full flex-col overflow-y-auto'></div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotionProvider>
  );
});

Generate.displayName = 'Generate';
