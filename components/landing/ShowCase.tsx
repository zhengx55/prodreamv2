'use client';
import { fadeIn } from '@/constant/motion';
import { m } from 'framer-motion';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const ShowCase = () => {
  const datalist = [
    {desc: `"Simply the best! This tool is a game-changer for refining academic drafts. What's even more impressive is its support for multiple languages, including Mandarin. It makes my writing process so easy!"`, src: '/landing/showcase/Oval.png',name: 'Yuqing Wang', from: 'China' },
    {desc: `"I've tried a few AI tools, and ProDream is hands down the best. It helps with tenses, paraphrasing, and organizes my paragraphs for better language. Using ProDream makes me feel confident about my paper.”`, src: '/landing/showcase/Oval2.png',name: 'Aarav S. Gupta', from: 'PhD Student ' },
    {desc: `“ProDream is my go-to writing tool now. It helps me polish my sentences to fit academic style, sorts out the confusing parts, and has certainly contributed to boosting my grades. Writing papers just got a whole lot easier with ProDream!”`, src: '/landing/showcase/Oval3.png',name: 'Elijah Thompson', from: 'College Senior' }
  ]
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1410px]'>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex-col flex items-center justify-evenly gap-y-4 sm:gap-y-0'
        >
          <div className='flex flex-col w-full sm:flex-row'>
            <svg className='hidden sm:block' xmlns="http://www.w3.org/2000/svg" width="100" height="64" viewBox="0 0 100 64" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M-0.00203705 42.0996C-0.00203705 18.8819 20.4228 -0.0018959 45.5369 -0.0018959C47.3318 -0.0018959 48.7967 1.33358 48.7967 2.99183C48.7967 4.66877 47.3318 6.00425 45.5369 6.00425C29.8774 6.00425 16.3455 14.5831 10.1279 26.9182C13.337 25.1009 17.1071 24.0508 21.1388 24.0508C32.7971 24.0508 42.2821 32.8191 42.2821 43.5965C42.2821 54.3762 32.7971 63.1445 21.1388 63.1445C9.48048 63.1445 -0.00203705 54.3762 -0.00203705 43.5965C-0.00203705 43.2152 0.0131912 42.8364 0.0360413 42.4575C0.020813 42.3405 -0.00203705 42.2212 -0.00203705 42.0996ZM96.4185 -0.0018959C98.2312 -0.0018959 99.6758 1.33358 99.6758 2.99183C99.6758 4.66877 98.2312 6.00425 96.4185 6.00425C80.7641 6.00425 67.2423 14.5785 61.0298 26.9065C64.2338 25.0962 67.9963 24.0508 72.0204 24.0508C83.6786 24.0508 93.1789 32.8191 93.1789 43.5965C93.1789 54.3762 83.6786 63.1445 72.0204 63.1445C60.3595 63.1445 50.877 54.3762 50.877 43.5965C50.877 43.2152 50.8923 42.834 50.9151 42.4551C50.8999 42.3358 50.877 42.2212 50.877 42.0996C50.877 18.8819 71.3044 -0.0018959 96.4185 -0.0018959Z" fill="#9C2CF3"/>
            </svg>
            <svg className='block sm:hidden' xmlns="http://www.w3.org/2000/svg" width="25" height="34" viewBox="0 0 100 64" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M-0.00203705 42.0996C-0.00203705 18.8819 20.4228 -0.0018959 45.5369 -0.0018959C47.3318 -0.0018959 48.7967 1.33358 48.7967 2.99183C48.7967 4.66877 47.3318 6.00425 45.5369 6.00425C29.8774 6.00425 16.3455 14.5831 10.1279 26.9182C13.337 25.1009 17.1071 24.0508 21.1388 24.0508C32.7971 24.0508 42.2821 32.8191 42.2821 43.5965C42.2821 54.3762 32.7971 63.1445 21.1388 63.1445C9.48048 63.1445 -0.00203705 54.3762 -0.00203705 43.5965C-0.00203705 43.2152 0.0131912 42.8364 0.0360413 42.4575C0.020813 42.3405 -0.00203705 42.2212 -0.00203705 42.0996ZM96.4185 -0.0018959C98.2312 -0.0018959 99.6758 1.33358 99.6758 2.99183C99.6758 4.66877 98.2312 6.00425 96.4185 6.00425C80.7641 6.00425 67.2423 14.5785 61.0298 26.9065C64.2338 25.0962 67.9963 24.0508 72.0204 24.0508C83.6786 24.0508 93.1789 32.8191 93.1789 43.5965C93.1789 54.3762 83.6786 63.1445 72.0204 63.1445C60.3595 63.1445 50.877 54.3762 50.877 43.5965C50.877 43.2152 50.8923 42.834 50.9151 42.4551C50.8999 42.3358 50.877 42.2212 50.877 42.0996C50.877 18.8819 71.3044 -0.0018959 96.4185 -0.0018959Z" fill="#9C2CF3"/>
            </svg>
            <h1 className="font-baskerville text-left text-[28px] font-[400] ml-4 tracking-tighter sm:text-left sm:text-[72px]">Loved by students of all majors and backgrounds</h1>
          </div>
          <div className='w-full flex flex-col sm:flex-row bg-[#F5F6F9] sm:rounded-[36px] rounded-[8px] sm:py-[48px] py-[8px] sm:px-[24px] px-[4px] sm:mt-[60px] mt-[20px]'>
            {datalist.map((item,index)=>(
              <div className={`${index<2 ? 'border-b sm:border-b-0 sm:border-r border-[#D1D0D6]' : ''} w-full mb-[20px] sm:mb-0 sm:w-1/3 p-[35px] sm:px-[26px]`} key={item.name}>
                <p className='text-[#3B3A40] sm:text-[20px] text-[14px] text-[400]'>{item.desc}</p>
                <div className='flex mt-[30px]'>
                  <Image
                    alt={''}
                    src={item.src}
                    className='h-auto rounded-[100px] w-[42px] object-contain'
                    width={42}
                    height={42}
                  />
                  <div className='sm:ml-[18px] ml-[12px]'>
                    <h5 className='text-[#3B3A40] text-[16px] font-[700]'>{item.name}</h5>
                    <p className='text-[#8E8C95] text-[14px] text-[400]'>{item.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </m.div>
        <div className='sm:mb-[100px] sm:pt-[200px]'>
          <h1 className='font-baskerville text-[28px] font-[400] text-center sm:text-[72px] sm:text-center'>Every Writing Scenario,<br/> <span className="before:block before:absolute sm:before:top-[46px] before:top-[16px] before:-inset-1 before:-skew-y-0 before:h-[40%] before:bg-[#F2C8FB] relative inline-block before:z-[-1]">Masterfully</span> Covered</h1>
          <p className='small-regular text-[#64626A] text-center sm:text-center sm:text-[28px] sm:w-[98%]'>We cover all academic writing needs, from detailed research papers to engaging essays, with excellence in every word.</p>
        </div>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex-col flex items-center justify-evenly gap-y-4 sm:flex-row sm:gap-y-0 sm:gap-x-[68px]'
        >
          <m.div
            className='flex w-full items-center flex-col gap-y-2 sm:w-1/2'
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10.0221 6.66309C6.34047 6.66309 3.35547 9.64808 3.35547 13.3297V26.6631C3.35547 30.3447 6.34047 33.3297 10.0221 33.3297L15.0371 33.3464C15.7471 33.3464 16.4905 33.6731 17.3421 34.4581C17.6738 34.7647 18.0705 35.1481 18.3405 35.5064C18.6405 35.9064 19.0321 36.6681 20.0221 36.6631C21.0121 36.6581 21.3338 35.9847 21.6888 35.5164C21.9571 35.1864 22.2788 34.8714 22.6105 34.5648C23.4638 33.7798 24.3122 33.3297 25.0222 33.3297H30.0222C33.7038 33.3297 36.6888 30.3447 36.6888 26.6631V13.3297C36.6888 9.64808 33.7038 6.66309 30.0222 6.66309H25.0222C23.0038 6.66309 21.2455 7.58976 20.0221 9.00643C18.7988 7.58976 17.0405 6.66309 15.0221 6.66309H10.0221ZM10.0221 9.99642H15.0221C16.8638 9.99642 18.3555 11.4881 18.3555 13.3297L18.3655 31.078C17.3255 30.403 16.2088 29.9964 15.0221 29.9964H10.0221C8.18047 29.9964 6.6888 28.5047 6.6888 26.6631V13.3297C6.6888 11.4881 8.18047 9.99642 10.0221 9.99642ZM25.0222 9.99642H30.0222C31.8638 9.99642 33.3555 11.4881 33.3555 13.3297V26.6631C33.3555 28.5047 31.8638 29.9964 30.0222 29.9964H25.0222C23.8355 29.9964 22.7222 30.4247 21.6822 31.0997L21.6888 13.3297C21.6888 11.4881 23.1805 9.99642 25.0222 9.99642Z" fill="#8551F3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[36px] text-[16px] font-[600] text-center'>Research Papers</h5>
              <p className='small-regular sm:text-[28px] text-[#64626A] text-center sm:w-full'>
                Dive into diverse disciplines, from engineering to social sciences, with our AI&apos;s specialized research paper guidance.
              </p>
            </div>
            <Spacer y='68' />
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path opacity="0.986784" d="M28.3294 3.25488C27.8878 3.25488 27.4444 3.41156 27.1311 3.72323C24.6311 6.22323 24.6311 6.22323 23.7978 7.05656L12.1311 18.7232C11.8194 19.0366 11.6628 19.4799 11.6628 19.9215V26.5882C11.6628 27.5082 12.4094 28.2549 13.3294 28.2549C14.1628 28.2549 19.1628 28.2549 19.9961 28.2549C20.4378 28.2549 20.8811 28.0982 21.1944 27.7865L32.8611 16.1199C33.6944 15.2865 33.6944 15.2865 36.1944 12.7865C36.5061 12.4732 36.6628 12.0299 36.6628 11.5882C36.6628 8.86155 35.9678 6.91324 34.5278 5.44157C33.0728 3.95824 31.1311 3.25488 28.3294 3.25488ZM11.6628 4.92155C7.98109 4.92155 4.99609 7.90655 4.99609 11.5882V28.2549C4.99609 31.9365 7.98109 34.9215 11.6628 34.9215H28.3294C32.0111 34.9215 34.9961 31.9365 34.9961 28.2549V21.5882C34.9961 20.6682 34.2494 19.9215 33.3294 19.9215C32.4094 19.9215 31.6628 20.6682 31.6628 21.5882V28.2549C31.6628 30.0965 30.1711 31.5882 28.3294 31.5882H11.6628C9.82109 31.5882 8.32943 30.0965 8.32943 28.2549V11.5882C8.32943 9.74655 9.82109 8.25488 11.6628 8.25488H18.3294C19.2494 8.25488 19.9961 7.50822 19.9961 6.58822C19.9961 5.66822 19.2494 4.92155 18.3294 4.92155H11.6628ZM29.0078 6.61985C30.5111 6.70819 31.4628 7.05153 32.1311 7.73486C32.8144 8.43153 33.2078 9.48323 33.2994 10.9582C32.4844 11.7732 31.9794 12.2566 31.6694 12.5682C30.3478 11.2482 28.6711 9.58652 27.3511 8.26485C27.6628 7.95319 28.1928 7.43485 29.0078 6.61985ZM24.9994 10.6316L29.3078 14.9283L19.2661 24.9215C18.2128 24.9215 16.5311 24.9215 14.9961 24.9215V20.6515L24.9994 10.6316Z" fill="#8551F3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[36px] text-[16px] font-[600] text-center'>Essays</h5>
              <p className='small-regular sm:text-[28px] text-[#64626A] text-center sm:w-full'>
                Elevate your essays: our AI pinpoints and perfects your thesis for impactful arguments
              </p>
            </div>
          </m.div>
          <m.div
            className='flex w-full flex-col items-center sm:h-[515px] sm:w-1/2'
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M11.6641 3.33105C9.8224 3.33105 8.33073 4.82339 8.33073 6.66439V26.6644C8.33073 28.5054 9.8224 29.9977 11.6641 29.9977H14.9974C16.8391 29.9977 18.3307 28.5054 18.3307 26.6644V6.66439C18.3307 4.82339 16.8391 3.33105 14.9974 3.33105H11.6641ZM11.6641 6.66439H14.9974V26.6644H11.6641V6.66439ZM24.9974 13.3311C23.1557 13.3311 21.6641 14.8234 21.6641 16.6644V26.6644C21.6641 28.5054 23.1557 29.9977 24.9974 29.9977H28.3307C30.1724 29.9977 31.6641 28.5054 31.6641 26.6644V16.6644C31.6641 14.8234 30.1724 13.3311 28.3307 13.3311H24.9974ZM24.9974 16.6644H28.3307V26.6644H24.9974V16.6644ZM8.33073 33.3311C7.41073 33.3311 6.66406 34.0772 6.66406 34.9977C6.66406 35.9182 7.41073 36.6644 8.33073 36.6644H31.6641C32.5841 36.6644 33.3307 35.9182 33.3307 34.9977C33.3307 34.0772 32.5841 33.3311 31.6641 33.3311H8.33073Z" fill="#8551F3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[36px] text-[16px] font-[600] text-center'>Case Studies</h5>
              <p className='small-regular sm:text-[28px] text-[#64626A] text-center sm:w-full'>
                Analytical clarity meets depth in your case studies, courtesy of our targeted AI insights
              </p>
            </div>
            <Spacer y='136' />
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20.0221 3.33105C10.8171 3.33105 3.35547 10.7927 3.35547 19.9977C3.35547 21.8511 3.75713 24.0477 4.34546 25.7794L3.82381 27.9144C2.41881 33.5344 6.36714 37.6044 12.0021 36.1961L14.2921 35.6227C16.0838 36.2477 18.1638 36.6644 20.0221 36.6644C29.2271 36.6644 36.6888 29.2027 36.6888 19.9977C36.6888 10.7927 29.2271 3.33105 20.0221 3.33105ZM20.0221 6.66439C27.3855 6.66439 33.3555 12.6344 33.3555 19.9977C33.3555 27.3611 27.3855 33.3311 20.0221 33.3311C18.3671 33.3311 16.6105 32.9677 15.0221 32.3411C14.7005 32.2144 14.3688 32.2061 14.0321 32.2894L11.2205 32.9661C8.04379 33.7611 6.24713 31.9711 7.05379 28.7477L7.67879 25.9877C7.75546 25.6577 7.75046 25.3127 7.62546 24.9977C7.0188 23.4561 6.6888 21.6977 6.6888 19.9977C6.6888 12.6344 12.6588 6.66439 20.0221 6.66439ZM13.3555 18.3311C12.4355 18.3311 11.6888 19.0777 11.6888 19.9977C11.6888 20.9177 12.4355 21.6644 13.3555 21.6644C14.2755 21.6644 15.0221 20.9177 15.0221 19.9977C15.0221 19.0777 14.2755 18.3311 13.3555 18.3311ZM20.0221 18.3311C19.1021 18.3311 18.3555 19.0777 18.3555 19.9977C18.3555 20.9177 19.1021 21.6644 20.0221 21.6644C20.9421 21.6644 21.6888 20.9177 21.6888 19.9977C21.6888 19.0777 20.9421 18.3311 20.0221 18.3311ZM26.6888 18.3311C25.7688 18.3311 25.0221 19.0777 25.0221 19.9977C25.0221 20.9177 25.7688 21.6644 26.6888 21.6644C27.6088 21.6644 28.3555 20.9177 28.3555 19.9977C28.3555 19.0777 27.6088 18.3311 26.6888 18.3311Z" fill="#8551F3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[36px] text-[16px] font-[600] text-center'>Literature Reviews</h5>
              <p className='small-regular sm:text-[28px] text-[#64626A] text-center sm:w-full'>
                Access over 200 million papers for your literature reviews, ensuring depth and diversity in your citations
              </p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
export default ShowCase;
