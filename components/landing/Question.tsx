'use client';
import { fadeIn } from '@/constant/motion';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Question = () => {
  const [selected, setSelected] = useState(0);
  const datalist = [
    {title: 'How is the free Personal Plan different from the Personal Pro and Team Plans?', desc: `Upgrade to the Personal Pro Plan for unlimited guests, or the Team Plan if you collaborate with the same group of people automatically. You can also review and remove inactive guests in Settings & Members.`},
    {title: 'What happens when I go over the guest limit on my Personal Plan?', desc: `Upgrade to the Personal Pro Plan for unlimited guests, or the Team Plan if you collaborate with the same group of people automatically. You can also review and remove inactive guests in Settings & Members.`},
    {title: 'How do I try out the Team Plan for free?', desc: `Upgrade to the Personal Pro Plan for unlimited guests, or the Team Plan if you collaborate with the same group of people automatically. You can also review and remove inactive guests in Settings & Members.`},
    {title: 'Can I use Notion for free?', desc: `Upgrade to the Personal Pro Plan for unlimited guests, or the Team Plan if you collaborate with the same group of people automatically. You can also review and remove inactive guests in Settings & Members.`},
    {title: 'Do you offer student discounts?', desc: `Upgrade to the Personal Pro Plan for unlimited guests, or the Team Plan if you collaborate with the same group of people automatically. You can also review and remove inactive guests in Settings & Members.`},
  ]
  return (
    <section className='relative flex w-full justify-center px-4 sm:py-20 pb-[80px] sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1410px]'>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex-col flex justify-evenly gap-y-4 w-full sm:flex-row sm:gap-y-0'
        >
          <m.div
            variants={
              fadeIn('right', 'tween', 0.2, 1)
            }
            className='flex w-full flex-col gap-y-2 sm:w-1/3'
          >
            <h1 className='font-baskerville text-[28px] font-[400] text-center sm:text-[50px] sm:text-left'>Frequently Asked <br/> <span className="before:block before:absolute sm:before:top-[36px] before:top-[22px] before:-inset-1 before:-skew-y-0 before:h-[40%] before:bg-[#D2DFFF] relative inline-block before:z-[-1]">Question&apos;s</span></h1>
            <p className='small-regular sm:text-[20px] text-[#64626A] text-center sm:text-left sm:w-[90%]'>
              Haven’t found what you’re looking for?<br/>Try the <span className='text-primary-200'>centerhelp@prodream.edu</span>
            </p>
          </m.div>
          <m.div
            variants={
              fadeIn('left', 'tween', 0.2, 1)
            }
            className='sm:w-2/3 p-[10px] sm:py-[29px] sm:px-[35px] sm:rounded-[36px] rounded-[8px] bg-[#F5F6F9]'
          >
            {datalist.map((item,index)=>(
              <div className='sm:mt-[20px] mt-[13px] bg-[#fff] sm:rounded-[24px] rounded-[8px] w-full px-[17px] py-[12px] sm:p-[36px]  cursor-pointer' key={index} onClick={()=>{setSelected(index)}}>
                <div className='flex justify-between'>
                  <div>
                    <p className={`${selected === index ? 'sm:text-[20px] text-[14px] text-primary-200' :'sm:text-[20px] text-[14px] text-[#3B3A40]'}`}>{item.title}</p>
                    
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
                {selected === index ? <p className='sm:text-[16px] text-[14px] text-[#64626A] mt-[20px]'>{item.desc}</p> : ''}
              </div>
              
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
export default Question;
