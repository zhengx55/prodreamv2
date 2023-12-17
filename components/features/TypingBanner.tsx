'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Spacer from '../root/Spacer';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { handleWelcomeSubmit } from '@/actions/action';
import { motion } from 'framer-motion';

const TypingBanner = () => {
  const [finsish, setFinsish] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const [formValue, setFormValue] = useState({
    firstname: '',
    lastname: '',
  });
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  return (
    <>
      <TypeAnimation
        sequence={[
          "Hi there! I'm Max, the CEO of ProDream and your guide in the world of college admissions. Together, we'll navigate the complexities of getting into your dream college. 💪🏻",
          () => {
            setFinsish(true);
          },
        ]}
        speed={90}
        wrapper='p'
        className='title-regular w-[700px]'
        cursor={false}
      />
      <Spacer y='64' />
      {finsish && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-1 shrink-0 flex-col'
        >
          <p className='title-semibold'>
            To get started, may I know your name?
          </p>
          <Spacer y='32' />
          <form
            ref={ref}
            action={handleWelcomeSubmit}
            className='flex flex-1 flex-col'
          >
            <div className='flex gap-x-4'>
              <div className='flex w-1/2 flex-col gap-y-4'>
                <label className='base-semibold' htmlFor='firstname'>
                  First Name/Preferred Name
                </label>
                <Input
                  value={formValue.firstname}
                  onChange={handleValueChange}
                  id='firstname'
                  name='firstname'
                  type='text'
                  className='h-12 w-full border-shadow-border bg-welcome-background/40'
                  required
                />
              </div>
              <div className='flex w-1/2 flex-col gap-y-4'>
                <label className='base-semibold' htmlFor='lastname'>
                  Last Name
                </label>
                <Input
                  value={formValue.lastname}
                  onChange={handleValueChange}
                  id='lastname'
                  name='lastname'
                  type='text'
                  className='h-12 w-full border-shadow-border bg-welcome-background/40'
                  required
                />
              </div>
            </div>
            <Button
              disabled={formValue.lastname === '' || formValue.lastname === ''}
              type='submit'
              className='mt-auto self-end'
            >
              Next
            </Button>
          </form>
        </motion.section>
      )}
    </>
  );
};

export default TypingBanner;
