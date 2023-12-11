'use client';

import { TourProvider, components } from '@reactour/tour';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { ActivityListTour } from '@/constant';
import { ReactNode } from 'react';

const Content: typeof components.Content = ({ content }) => (
  <p className='small-regular pr-8 text-justify text-white'>{content}</p>
);

const Navigation: typeof components.Navigation = ({
  currentStep,
  steps,
  setCurrentStep,
}) => (
  <>
    <Spacer y='14' />
    <section className='flex-between'>
      <span className='small-regular'>
        {currentStep + 1} / {steps.length}
      </span>
      <Button
        className='px-8'
        onClick={() => {
          setCurrentStep(currentStep + 1);
        }}
      >
        Next
      </Button>
    </section>
  </>
);
const ActivityTourProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TourProvider
      disableKeyboardNavigation
      components={{
        Navigation,
        Content,
      }}
      showPrevNextButtons={false}
      styles={{
        popover: (base) => ({
          ...base,
          padding: 12,
          borderRadius: 8,
          color: '#ffffff',
          backgroundColor: '#1D1B1E',
        }),
        close: (base) => ({
          ...base,
          width: 20,
          height: 20,
          top: 10,
          right: 10,
        }),
        maskArea: (base) => ({ ...base }),
        maskWrapper: (base) => ({ ...base, color: 'transparent' }),
      }}
      showBadge={false}
      showDots={false}
      // nextButton={({ currentStep, setCurrentStep, steps }) => {
      //   const last = currentStep === steps?.length;
      //   return (
      //     <Button
      //       className='px-8'
      //       onClick={() => {
      //         if (last) {
      //           setCurrentStep((s) => 0);
      //         } else {
      //           setCurrentStep((s) => s + 1);
      //         }
      //       }}
      //     >
      //       Next
      //     </Button>
      //   );
      // }}
      steps={ActivityListTour}
    >
      {children}
    </TourProvider>
  );
};

export default ActivityTourProvider;
