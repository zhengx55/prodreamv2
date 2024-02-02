import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';

const Guidence = () => {
  const [check, setCheck] = useState(-1);
  return (
    <LazyMotionProvider>
      <AnimatePresence initial={false}>
        <m.div className='absolute top-16 z-50 h-full w-full bg-white font-inter'>
          <div className='mx-auto flex w-[700px] flex-col'>
            <Spacer y='24' />
            <h1 className='text-[28px] font-semibold leading-normal'>
              Do you need help editing an essay or writing a new one from
              scratch?
            </h1>
            <Spacer y='24' />
            <ul className='flex flex-col gap-y-6 self-start'>
              <li className='inline-flex items-center gap-x-2'>
                <Checkbox
                  checked={check === 0}
                  onCheckedChange={() => {
                    setCheck(0);
                  }}
                  id='terms1'
                />
                <label
                  htmlFor='terms1'
                  className={`text-sm font-medium leading-none ${check === 0 ? 'text-doc-primary' : 'text-doc-font'}`}
                >
                  Yes, I have a draft already.
                </label>
              </li>
              <li className='inline-flex items-center gap-x-2'>
                <Checkbox
                  checked={check === 1}
                  onCheckedChange={() => {
                    setCheck(1);
                  }}
                  id='terms2'
                />
                <label
                  htmlFor='terms2'
                  className={`text-sm font-medium leading-none ${check === 1 ? 'text-doc-primary' : 'text-doc-font'}`}
                >
                  No, I am starting from scratch.
                </label>
              </li>
              <li className='inline-flex items-center gap-x-2'>
                <Checkbox
                  checked={check === 2}
                  onCheckedChange={() => {
                    setCheck(2);
                  }}
                  id='terms3'
                />
                <label
                  htmlFor='terms3'
                  className={`text-sm font-medium leading-none ${check === 2 ? 'text-doc-primary' : 'text-doc-font'}`}
                >
                  Neither, I&apos;m just exploring
                </label>
              </li>
            </ul>
            <Spacer y='32' />
            <AnimatePresence mode='wait'>
              {check === 0 ? (
                <m.p
                  key={'terms-1'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='text-[28px] font-semibold leading-normal'
                >
                  Sounds good! please paste or upload your essay to the text
                  editor :)
                </m.p>
              ) : check === 1 ? (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='flex flex-col gap-y-4'
                  key={'terms-2'}
                >
                  <h2 className='text-[28px] font-semibold leading-normal'>
                    Let&apos;s get started by generating an outline!
                  </h2>
                  <p className='base-semibold'>
                    Could you briefly tell me what you are writing?
                  </p>
                  <Textarea
                    className='h-24 rounded shadow-lg'
                    name='outline-description'
                    placeholder='E.g. Importance of religion in East Asian culture'
                  />
                  <Button className='w-max rounded bg-doc-primary'>
                    Generate
                  </Button>
                  <p className='base-semibold'>
                    It&apos;s totally fine if you don&apos;t have an essay topic
                    in mind!&nbsp;
                    <span className='cursor-pointer text-doc-primary underline'>
                      Click here
                    </span>
                    &nbsp;to check out a sample outline.
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </m.div>
      </AnimatePresence>
    </LazyMotionProvider>
  );
};
export default Guidence;
