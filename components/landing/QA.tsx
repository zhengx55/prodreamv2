'use client';

import useInviewCapture from '@/hooks/useInViewCapture';
import useLocalization from '@/hooks/useLocalization';
import { useState } from 'react';

const datalist = [
  {
    title: 'How secure is my data with ProDream?',
    desc: `We prioritize your privacy, safeguarding your data with top-tier encryption and the robust security of Microsoft Azure.`,
  },
  {
    title: 'Will my ProDream edited document be flagged as plagiarized?',
    desc: `Typically, ProDream edited documents are unlikely to be flagged as plagiarized at the document level, especially if the original content isn't copied. The likelihood of ProDream-generated text triggering plagiarism checks at the sentence level is low because it adheres to standard academic sentence structures. However, it's important to acknowledge that tools like Turnitin might identify certain sentences as resembling published literature due to the nature of ProDream's suggestions.`,
  },
  {
    title: 'Will my ProDream edited document be flagged by AI detectors?',
    desc: `Being flagged by AI detectors isn't necessarily negative. Authors use AI tools like ProDream to enhance writing. These detectors ensure content reliability. Understand their scoring and refine text using ProDream's output in your style. However, AI detectors are evolving; one misattributed the US Constitution to AI. They're useful but not always accurate.`,
  },
  {
    title: 'How much does ProDream cost?',
    desc: `ProDream is currently offered at no cost during our BETA phase, and your participation now could reward you with exclusive discounts for future services.`,
  },
  {
    title: 'How can I report an issue with ProDream?',
    desc: `We greatly value your feedback and are here to help resolve any issues you encounter with ProDream. Please don't hesitate to reach out to us at support@prodream.ai or join our Discord server for direct support and assistance.`,
  },
];
const QA = () => {
  const [selected, setSelected] = useState(0);
  const { ref } = useInviewCapture('ScreenVI');

  const { t } = useLocalization()

  return (
    <div
      ref={ref}
      className='rounded-xl bg-[#F5F6F9] p-[10px] sm:w-[55%] sm:rounded-[36px] sm:p-[15px]'
    >
      {datalist.map((item, index) => (
        <div
          className='mt-[13px] w-full cursor-pointer rounded-xl bg-white px-[17px] py-[12px] sm:mb-[20px] sm:mt-0 sm:rounded-[24px] sm:p-6'
          key={index}
          onClick={() => {
            setSelected(index);
          }}
        >
          <div className='flex justify-between'>
            <div>
              <p
                className={`${selected === index ? 'text-[14px] font-[500] text-doc-primary sm:text-[20px]' : 'text-[14px] font-[500] text-[#3B3A40] sm:text-[20px]'}`}
              >
                { t(`QuestionInfo_title_${index+1}`) }
              </p>
            </div>
            <div>
              {selected === index ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='29'
                  height='29'
                  viewBox='0 0 29 29'
                  fill='none'
                >
                  <path
                    d='M22.6128 15.2235H15.6069H13.2716H6.26562V12.8848H13.2716H15.6069H22.6128V15.2235Z'
                    fill='#9C2CF3'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='29'
                  height='29'
                  viewBox='0 0 29 29'
                  fill='none'
                >
                  <path
                    d='M22.6128 15.4418H15.6069V22.4579H13.2716V15.4418H6.26562V13.1031H13.2716V6.08691H15.6069V13.1031H22.6128V15.4418Z'
                    fill='#64626A'
                  />
                </svg>
              )}
            </div>
          </div>
          {selected === index ? (
            <p className='mt-[20px] text-[14px] text-[#64626A] sm:text-[18px]'>
               { t(`QuestionInfo_desc_${index+1}`) }
            </p>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};
export default QA;
