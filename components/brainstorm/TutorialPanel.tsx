'use client';
import { BrianstormAutoFill } from '@/constant';
import { InputProps } from '@/types';
import useRootStore from '@/zustand/store';
import { m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const TutorialPanel = ({
  handleTabChange,
}: {
  handleTabChange: (value: number) => void;
}) => {
  const [steps, setSteps] = useState(0);
  const path = usePathname();
  const template_id = path.split('/')[3];
  const setTutorial = useRootStore((state) => state.updatebsTutorial);
  return (
    <m.div
      key='tutorial'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='flex h-full w-full flex-col gap-y-6 rounded-lg bg-white px-4 py-6'
    >
      <h1 className='h3-bold'>Tutorial</h1>
      {/* step 1 */}
      <section
        className={`${
          steps === 0
            ? 'border-black-200 bg-primary-50'
            : 'border-shadow-border'
        } flex flex-col gap-y-4 rounded-lg border px-4 py-4`}
        id='tut-step-1'
      >
        <div className='flex items-center gap-x-2'>
          <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
            1
          </div>
          <h2 className='title-semibold'>Fill in your past experience</h2>
        </div>
        <p className='small-regular'>
          Imagine that you are Jessie and you have an essay idea about
          overcoming your initial struggles in public speaking and debating,
          which not only leads to personal growth and award-winning performances
          but also empowers you to effectively champion animal rights movements.
        </p>
        <p className='small-regular'>
          <strong>We&apos;ve prefilled the boxes for you!</strong>&nbsp; You
          don&apos;t need to have a well-thought story/ idea to generate a full
          essay. Jessie is exploring what she could reflect from her essay, so
          she only puts bullet points, a short paragraph, and some draft ideas.
          In order to check how different ideas could be written, Jessie wants
          to use the Expand feature to add elements to her story.
        </p>
      </section>
      {steps === 1 && (
        <m.section
          id='tut-step-2'
          className={`${
            steps === 1
              ? 'border-black-200 bg-primary-50'
              : 'border-shadow-border'
          } flex flex-col gap-y-4 rounded-lg border px-4 py-4`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='flex items-center gap-x-2'>
            <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
              2
            </div>
            <h2 className='title-semibold'>
              Click “Generate” to get your essay output
            </h2>
          </div>
          <p className='small-regular'>
            Jessie is satisfied with the info she just filled. She then clicks
            generate to generate her sample essay.
          </p>
        </m.section>
      )}
      <Spacer y='24' />
      <Button
        onClick={() => {
          if (steps === 0) {
            setSteps((prev) => prev + 1);
            const match = BrianstormAutoFill.find(
              (item) => item.id === template_id
            );
            if (!match) return;
            const autofillQsPair = match?.info.reduce(
              (acc: Record<string, InputProps>, item) => {
                acc[item.question_id] = { value: item.content, disable: false };
                return acc;
              },
              {}
            );
            setTutorial(autofillQsPair);
          } else {
            // handle generate essay
            const generate_button = document.getElementById('generate-button');
            if (generate_button) {
              generate_button.click();
              handleTabChange(0);
            }
          }
        }}
        className='self-end'
      >
        Next
      </Button>
    </m.div>
  );
};

export default TutorialPanel;
