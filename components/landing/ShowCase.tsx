'use client';
import { fadeIn } from '@/constant/motion';
import { m } from 'framer-motion';
import Image from 'next/image';


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
        <div className='sm:mb-[100px]'>
          <h1 className='font-baskerville text-[28px] font-[400] text-center sm:text-[72px] sm:text-center'>Every Writing Scenario,<br/> <span className="before:block before:absolute sm:before:top-[46px] before:top-[16px] before:-inset-1 before:-skew-y-0 before:h-[40%] before:bg-[#F2C8FB] relative inline-block before:z-[-1]">Masterfully</span> Covered</h1>
          <p className='small-regular text-[#64626A] text-center sm:text-center sm:text-[32px] sm:w-[98%]'>We cover all academic writing needs, from detailed research papers to engaging essays, with excellence in every word.</p>
        </div>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex-col flex items-center justify-evenly gap-y-4 sm:flex-row sm:gap-y-0'
        >
          <m.div
            variants={
              fadeIn('right', 'tween', 0.2, 1)
            }
            className='flex w-full items-center sm:items-start flex-col gap-y-2 sm:w-1/2'
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <path d="M15.0352 10.8486C9.51266 10.8486 5.03516 15.3261 5.03516 20.8486V40.8486C5.03516 46.3711 9.51266 50.8486 15.0352 50.8486L22.5577 50.8736C23.6227 50.8736 24.7377 51.3636 26.0152 52.5411C26.5127 53.0011 27.1077 53.5762 27.5127 54.1137C27.9627 54.7137 28.5502 55.8561 30.0352 55.8486C31.5202 55.8411 32.0027 54.8311 32.5352 54.1286C32.9377 53.6336 33.4202 53.1612 33.9177 52.7012C35.1977 51.5237 36.4702 50.8486 37.5352 50.8486H45.0352C50.5577 50.8486 55.0352 46.3711 55.0352 40.8486V20.8486C55.0352 15.3261 50.5577 10.8486 45.0352 10.8486H37.5352C34.5077 10.8486 31.8702 12.2386 30.0352 14.3636C28.2002 12.2386 25.5627 10.8486 22.5352 10.8486H15.0352ZM15.0352 15.8486H22.5352C25.2977 15.8486 27.5352 18.0861 27.5352 20.8486L27.5502 47.4711C25.9902 46.4586 24.3152 45.8486 22.5352 45.8486H15.0352C12.2727 45.8486 10.0352 43.6111 10.0352 40.8486V20.8486C10.0352 18.0861 12.2727 15.8486 15.0352 15.8486ZM37.5352 15.8486H45.0352C47.7977 15.8486 50.0352 18.0861 50.0352 20.8486V40.8486C50.0352 43.6111 47.7977 45.8486 45.0352 45.8486H37.5352C35.7552 45.8486 34.0852 46.4911 32.5252 47.5036L32.5352 20.8486C32.5352 18.0861 34.7727 15.8486 37.5352 15.8486Z" fill="#9C2CF3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[24px] text-[16px] font-[600] text-center sm:text-left'>Research Papers</h5>
              <p className='small-regular sm:text-[20px] text-[#64626A] text-center sm:text-left sm:w-[80%]'>
                Your own customer success manager to help onboard large teams and create custom workflows.
              </p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <path opacity="0.986784" d="M42.4961 5.7373C41.8336 5.7373 41.1686 5.97232 40.6986 6.43982C36.9486 10.1898 36.9486 10.1898 35.6986 11.4398L18.1986 28.9398C17.7311 29.4098 17.4961 30.0748 17.4961 30.7373V40.7373C17.4961 42.1173 18.6161 43.2373 19.9961 43.2373C21.2461 43.2373 28.7461 43.2373 29.9961 43.2373C30.6586 43.2373 31.3236 43.0023 31.7936 42.5348L49.2936 25.0348C50.5436 23.7848 50.5436 23.7848 54.2936 20.0348C54.7611 19.5648 54.9961 18.8998 54.9961 18.2373C54.9961 14.1473 53.9536 11.2248 51.7936 9.01733C49.6111 6.79233 46.6986 5.7373 42.4961 5.7373ZM17.4961 8.2373C11.9736 8.2373 7.49609 12.7148 7.49609 18.2373V43.2373C7.49609 48.7598 11.9736 53.2373 17.4961 53.2373H42.4961C48.0186 53.2373 52.4961 48.7598 52.4961 43.2373V33.2373C52.4961 31.8573 51.3761 30.7373 49.9961 30.7373C48.6161 30.7373 47.4961 31.8573 47.4961 33.2373V43.2373C47.4961 45.9998 45.2586 48.2373 42.4961 48.2373H17.4961C14.7336 48.2373 12.4961 45.9998 12.4961 43.2373V18.2373C12.4961 15.4748 14.7336 13.2373 17.4961 13.2373H27.4961C28.8761 13.2373 29.9961 12.1173 29.9961 10.7373C29.9961 9.3573 28.8761 8.2373 27.4961 8.2373H17.4961ZM43.5136 10.7848C45.7686 10.9173 47.1961 11.4323 48.1986 12.4573C49.2236 13.5023 49.8136 15.0798 49.9511 17.2923C48.7286 18.5148 47.9711 19.2398 47.5061 19.7073C45.5236 17.7273 43.0086 15.2348 41.0286 13.2523C41.4961 12.7848 42.2911 12.0073 43.5136 10.7848ZM37.5011 16.8024L43.9636 23.2474L28.9011 38.2373C27.3211 38.2373 24.7986 38.2373 22.4961 38.2373V31.8323L37.5011 16.8024Z" fill="#9C2CF3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[24px] text-[16px] font-[600] text-center sm:text-left'>Essays</h5>
              <p className='small-regular sm:text-[20px] text-[#64626A] text-center sm:text-left sm:w-[80%]'>
                Extra permission controls to prevent certain employees from sharing pages externally, disable guests and etc.
              </p>
            </div>
          </m.div>
          <m.div
            variants={
              fadeIn('left', 'tween', 0.2, 1)
            }
            className='flex w-full flex-col items-center sm:items-start sm:w-1/2'
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <path d="M17.4961 5.85156C14.7336 5.85156 12.4961 8.09006 12.4961 10.8516V40.8516C12.4961 43.6131 14.7336 45.8516 17.4961 45.8516H22.4961C25.2586 45.8516 27.4961 43.6131 27.4961 40.8516V10.8516C27.4961 8.09006 25.2586 5.85156 22.4961 5.85156H17.4961ZM17.4961 10.8516H22.4961V40.8516H17.4961V10.8516ZM37.4961 20.8516C34.7336 20.8516 32.4961 23.0901 32.4961 25.8516V40.8516C32.4961 43.6131 34.7336 45.8516 37.4961 45.8516H42.4961C45.2586 45.8516 47.4961 43.6131 47.4961 40.8516V25.8516C47.4961 23.0901 45.2586 20.8516 42.4961 20.8516H37.4961ZM37.4961 25.8516H42.4961V40.8516H37.4961V25.8516ZM12.4961 50.8516C11.1161 50.8516 9.99609 51.9708 9.99609 53.3516C9.99609 54.7323 11.1161 55.8516 12.4961 55.8516H47.4961C48.8761 55.8516 49.9961 54.7323 49.9961 53.3516C49.9961 51.9708 48.8761 50.8516 47.4961 50.8516H12.4961Z" fill="#9C2CF3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[24px] text-[16px] font-[600] text-center sm:text-left'>Case Studies</h5>
              <p className='small-regular sm:text-[20px] text-[#64626A] text-center sm:text-left sm:w-[80%]'>
                We’ll work with you to create a custom contract and payment via PO/invoice.
              </p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                <path d="M15.0352 10.8486C9.51266 10.8486 5.03516 15.3261 5.03516 20.8486V35.8486C5.03516 41.3711 9.51266 45.8486 15.0352 45.8486H21.4402L28.2377 52.646C29.2127 53.6235 30.7776 53.621 31.7551 52.646L38.6301 45.8486H45.0352C50.5577 45.8486 55.0352 41.3711 55.0352 35.8486V20.8486C55.0352 15.3261 50.5577 10.8486 45.0352 10.8486H15.0352ZM15.0352 15.8486H45.0352C47.7977 15.8486 50.0352 18.0861 50.0352 20.8486V35.8486C50.0352 38.6111 47.7977 40.8486 45.0352 40.8486H37.5352C36.8727 40.8486 36.2077 41.0836 35.7377 41.5511L30.0352 47.2536L24.3326 41.5511C23.8626 41.0811 23.2002 40.8486 22.5352 40.8486H15.0352C12.2727 40.8486 10.0352 38.6111 10.0352 35.8486V20.8486C10.0352 18.0861 12.2727 15.8486 15.0352 15.8486ZM17.5352 20.8486C16.1552 20.8486 15.0352 21.9686 15.0352 23.3486C15.0352 24.7286 16.1552 25.8486 17.5352 25.8486H42.5352C43.9152 25.8486 45.0352 24.7286 45.0352 23.3486C45.0352 21.9686 43.9152 20.8486 42.5352 20.8486H17.5352ZM17.5352 30.8486C16.1552 30.8486 15.0352 31.9686 15.0352 33.3486C15.0352 34.7286 16.1552 35.8486 17.5352 35.8486H35.0352C36.4152 35.8486 37.5352 34.7286 37.5352 33.3486C37.5352 31.9686 36.4152 30.8486 35.0352 30.8486H17.5352Z" fill="#9C2CF3"/>
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='sm:h2-bold sm:text-[24px] text-[16px] font-[600] text-center sm:text-left'>Literature Reviews</h5>
              <p className='small-regular sm:text-[20px] text-[#64626A] text-center sm:text-left sm:w-[80%]'>
                Access version history of any page indefinitely, not just only 30 days like other products.
              </p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
export default ShowCase;
