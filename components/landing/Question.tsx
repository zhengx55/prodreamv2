'use client';
import { fadeIn } from '@/constant/motion';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Question = () => {
  const [selected, setSelected] = useState(0);
  const datalist = [
    {title: 'How secure is my data with ProDream?', desc: `We prioritize your privacy, safeguarding your data with top-tier encryption and the robust security of Microsoft Azure.`},
    {title: 'Will my ProDream edited document be flagged as plagiarized?', desc: `Typically, ProDream edited documents are unlikely to be flagged as plagiarized at the document level, especially if the original content isn't copied. The likelihood of ProDream-generated text triggering plagiarism checks at the sentence level is low because it adheres to standard academic sentence structures. However, it's important to acknowledge that tools like Turnitin might identify certain sentences as resembling published literature due to the nature of ProDream's suggestions.`},
    {title: 'Will my ProDream edited document be flagged by AI detectors?', desc: `Being flagged by AI detectors isn't necessarily negative. Authors use AI tools like ProDream to enhance writing. These detectors ensure content reliability. Understand their scoring and refine text using ProDream's output in your style. However, AI detectors are evolving; one misattributed the US Constitution to AI. They're useful but not always accurate.`},
    {title: 'How much does ProDream cost?', desc: `ProDream is currently offered at no cost during our BETA phase, and your participation now could reward you with exclusive discounts for future services.`},
    {title: 'How can I report an issue with ProDream?', desc: `We greatly value your feedback and are here to help resolve any issues you encounter with ProDream. Please don't hesitate to reach out to us at support@prodream.ai or join our Discord server for direct support and assistance.`},
  ]
  return (
    <section className='relative flex w-full justify-center px-4 sm:py-20 pb-[80px] sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1200px]'>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex-col flex justify-evenly gap-y-4 w-full sm:flex-row sm:gap-y-0'
        >
          <m.div
            className='flex w-full flex-col gap-y-2 sm:w-1/3'
          >
            <h1 className='font-baskerville text-[28px] font-[400] text-center leading-[32px] sm:leading-[58px] sm:text-[48px] sm:text-left'>Frequently Asked <br/> <span className="before:block before:absolute sm:before:top-[36px] before:top-[22px] before:-inset-1 before:-skew-y-0 before:h-[40%] before:bg-[#D2DFFF] relative inline-block before:z-[-1]">Question&apos;s</span></h1>
            <p className='small-regular sm:text-[18px] text-[#64626A] text-center sm:text-left sm:w-full'>
            Have questions or need support? Shoot us an email at <span className='text-[#8551F3]'>support@prodream.ai</span>
            </p>
          </m.div>
          <m.div
            className='sm:w-2/3 p-[10px] sm:p-[15px] sm:rounded-[36px] rounded-[8px] bg-[#F5F6F9]'
          >
            {datalist.map((item,index)=>(
              <div className='sm:mb-[20px] sm:mt-0 mt-[13px] bg-[#fff] sm:rounded-[24px] rounded-[8px] w-full px-[17px] py-[12px] sm:p-[36px]  cursor-pointer' key={index} onClick={()=>{setSelected(index)}}>
                <div className='flex justify-between'>
                  <div>
                    <p className={`${selected === index ? 'sm:text-[20px] font-[500] text-[14px] text-[#8551F3]' :'sm:text-[20px] font-[500] text-[14px] text-[#3B3A40]'}`}>{item.title}</p>
                    
                  </div>
                  <div>
                    {selected === index ? <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                      <path d="M22.6128 15.2235H15.6069H13.2716H6.26562V12.8848H13.2716H15.6069H22.6128V15.2235Z" fill="#9C2CF3"/>
                    </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                      <path d="M22.6128 15.4418H15.6069V22.4579H13.2716V15.4418H6.26562V13.1031H13.2716V6.08691H15.6069V13.1031H22.6128V15.4418Z" fill="#64626A"/>
                    </svg>}
                  </div>
                </div>
                {selected === index ? <p className='sm:text-[18px] text-[14px] text-[#64626A] mt-[20px]'>{item.desc}</p> : ''}
              </div>
              
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
export default Question;
