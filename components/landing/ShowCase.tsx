'use client';
import Image from 'next/image';
import Spacer from '../root/Spacer';
const datalist = [
  {
    desc: `"Simply the best! This tool is a game-changer for refining academic drafts. What's even more impressive is its support for multiple languages, including Mandarin. It makes my writing process so easy!"`,
    src: '/landing/showcase/Oval.png',
    name: 'Yuqing Wang',
    from: 'China',
  },
  {
    desc: `"I've tried a few AI tools, and ProDream is hands down the best. It helps with tenses, paraphrasing, and organizes my paragraphs for better language. Using ProDream makes me feel confident about my paper.”`,
    src: '/landing/showcase/Oval2.png',
    name: 'Aarav S. Gupta',
    from: 'PhD Student ',
  },
  {
    desc: `“ProDream is my go-to writing tool now. It helps me polish my sentences to fit academic style, sorts out the confusing parts, and has certainly contributed to boosting my grades. Writing papers just got a whole lot easier with ProDream!”`,
    src: '/landing/showcase/Oval3.png',
    name: 'Elijah Thompson',
    from: 'College Senior',
  },
];
const ShowCase = () => {
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1200px]'>
        <div className='flex flex-col items-center justify-evenly gap-y-4 sm:gap-y-0'>
          <div className='flex w-full flex-col sm:flex-row sm:justify-center'>
            <svg
              className='hidden sm:block'
              xmlns='http://www.w3.org/2000/svg'
              width='96'
              height='64'
              viewBox='0 0 96 64'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M-0.00131989 42.9551C-0.00131989 19.7374 19.5254 0.853573 43.5352 0.853573C45.2512 0.853573 46.6517 2.18905 46.6517 3.84729C46.6517 5.52424 45.2512 6.85972 43.5352 6.85972C28.5643 6.85972 15.6273 15.4386 9.68317 27.7737C12.7511 25.9564 16.3555 24.9062 20.2099 24.9062C31.3555 24.9062 40.4235 33.6746 40.4235 44.4519C40.4235 55.2317 31.3555 64 20.2099 64C9.06423 64 -0.00131989 55.2317 -0.00131989 44.4519C-0.00131989 44.0707 0.0132446 43.6918 0.0350876 43.3129C0.0205231 43.196 -0.00131989 43.0767 -0.00131989 42.9551ZM92.1906 0.853573C93.9236 0.853573 95.3047 2.18905 95.3047 3.84729C95.3047 5.52424 93.9236 6.85972 92.1906 6.85972C77.2246 6.85972 64.2973 15.4339 58.358 27.762C61.4211 25.9517 65.0182 24.9062 68.8653 24.9062C80.011 24.9062 89.0935 33.6746 89.0935 44.4519C89.0935 55.2317 80.011 64 68.8653 64C57.7172 64 48.6517 55.2317 48.6517 44.4519C48.6517 44.0707 48.6662 43.6895 48.6881 43.3106C48.6735 43.1913 48.6517 43.0767 48.6517 42.9551C48.6517 19.7374 68.1808 0.853573 92.1906 0.853573Z'
                fill='#8551F3'
              />
            </svg>
            <svg
              className='block sm:hidden'
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='34'
              viewBox='0 0 100 64'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M-0.00203705 42.0996C-0.00203705 18.8819 20.4228 -0.0018959 45.5369 -0.0018959C47.3318 -0.0018959 48.7967 1.33358 48.7967 2.99183C48.7967 4.66877 47.3318 6.00425 45.5369 6.00425C29.8774 6.00425 16.3455 14.5831 10.1279 26.9182C13.337 25.1009 17.1071 24.0508 21.1388 24.0508C32.7971 24.0508 42.2821 32.8191 42.2821 43.5965C42.2821 54.3762 32.7971 63.1445 21.1388 63.1445C9.48048 63.1445 -0.00203705 54.3762 -0.00203705 43.5965C-0.00203705 43.2152 0.0131912 42.8364 0.0360413 42.4575C0.020813 42.3405 -0.00203705 42.2212 -0.00203705 42.0996ZM96.4185 -0.0018959C98.2312 -0.0018959 99.6758 1.33358 99.6758 2.99183C99.6758 4.66877 98.2312 6.00425 96.4185 6.00425C80.7641 6.00425 67.2423 14.5785 61.0298 26.9065C64.2338 25.0962 67.9963 24.0508 72.0204 24.0508C83.6786 24.0508 93.1789 32.8191 93.1789 43.5965C93.1789 54.3762 83.6786 63.1445 72.0204 63.1445C60.3595 63.1445 50.877 54.3762 50.877 43.5965C50.877 43.2152 50.8923 42.834 50.9151 42.4551C50.8999 42.3358 50.877 42.2212 50.877 42.0996C50.877 18.8819 71.3044 -0.0018959 96.4185 -0.0018959Z'
                fill='#9C2CF3'
              />
            </svg>
            <h1 className='ml-4 text-left font-baskerville text-[28px] font-[400] tracking-tighter sm:text-left sm:text-[48px]'>
              Loved by students of all majors and
              <br className='hidden sm:block' /> backgrounds
            </h1>
          </div>
          <div className='mt-[20px] flex w-full flex-col rounded-[8px] bg-[#F5F6F9] px-[4px] py-[8px] sm:mt-[60px] sm:flex-row sm:rounded-[36px] sm:px-[24px] sm:py-[48px]'>
            {datalist.map((item, index) => (
              <div
                className={`${index < 2 ? 'border-b border-[#D1D0D6] sm:border-b-0 sm:border-r' : ''} mb-[20px] w-full p-[35px] sm:mb-0 sm:flex sm:w-1/3 sm:flex-col sm:justify-between sm:px-[26px]`}
                key={item.name}
              >
                <p className='text-[14px] text-[#3B3A40] text-[400] sm:text-[18px]'>
                  {item.desc}
                </p>
                <div className='mt-[30px] flex'>
                  <Image
                    alt={'showcase'}
                    src={item.src}
                    className='h-auto w-auto rounded-[100px]'
                    width={42}
                    height={42}
                  />
                  <div className='ml-[12px] sm:ml-[18px]'>
                    <h5 className='text-[16px] font-[700] text-[#3B3A40] sm:text-[18px]'>
                      {item.name}
                    </h5>
                    <p className='text-[14px] text-[#8E8C95] text-[400]'>
                      {item.from}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='sm:mb-[80px] sm:pt-[200px]'>
          <h1 className='text-center font-baskerville text-[28px] font-[400] leading-[32px] sm:text-center sm:text-[48px] sm:leading-[58px]'>
            Every Writing Scenario,
            <br />{' '}
            <span className='relative inline-block before:absolute before:-inset-1 before:top-[16px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#F2C8FB] sm:before:top-[26px]'>
              Masterfully
            </span>{' '}
            Covered
          </h1>
          <Spacer y='20' />
          <p className='small-regular text-center text-[#64626A] sm:w-full sm:text-center sm:text-[18px]'>
            We cover all academic writing needs, from detailed research papers
            to engaging <br className='hidden sm:block' />
            essays, with excellence in every word.
          </p>
        </div>
        <div className='flex flex-col items-center justify-evenly gap-y-4 sm:flex-row sm:gap-x-[68px] sm:gap-y-0'>
          <div className='flex w-full flex-col items-center gap-y-2 sm:h-[368px] sm:w-1/2'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
              >
                <path
                  d='M8.01693 5.33008C5.0716 5.33008 2.68359 7.71808 2.68359 10.6634V21.3301C2.68359 24.2754 5.0716 26.6634 8.01693 26.6634L12.0289 26.6767C12.5969 26.6767 13.1916 26.9381 13.8729 27.5661C14.1383 27.8114 14.4556 28.1181 14.6716 28.4048C14.9116 28.7248 15.2249 29.3341 16.0169 29.3301C16.8089 29.3261 17.0663 28.7874 17.3503 28.4127C17.5649 28.1487 17.8223 27.8968 18.0876 27.6514C18.7703 27.0234 19.4489 26.6634 20.0169 26.6634H24.0169C26.9623 26.6634 29.3503 24.2754 29.3503 21.3301V10.6634C29.3503 7.71808 26.9623 5.33008 24.0169 5.33008H20.0169C18.4023 5.33008 16.9956 6.07142 16.0169 7.20475C15.0383 6.07142 13.6316 5.33008 12.0169 5.33008H8.01693ZM8.01693 7.99674H12.0169C13.4903 7.99674 14.6836 9.19007 14.6836 10.6634L14.6916 24.862C13.8596 24.322 12.9663 23.9967 12.0169 23.9967H8.01693C6.5436 23.9967 5.35026 22.8034 5.35026 21.3301V10.6634C5.35026 9.19007 6.5436 7.99674 8.01693 7.99674ZM20.0169 7.99674H24.0169C25.4903 7.99674 26.6836 9.19007 26.6836 10.6634V21.3301C26.6836 22.8034 25.4903 23.9967 24.0169 23.9967H20.0169C19.0676 23.9967 18.1769 24.3394 17.3449 24.8794L17.3503 10.6634C17.3503 9.19007 18.5436 7.99674 20.0169 7.99674Z'
                  fill='#8551F3'
                />
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='text-center text-[16px] font-[600] sm:text-[20px]'>
                Research Papers
              </h5>
              <p className='small-regular text-center text-[#64626A] sm:w-full sm:text-[18px]'>
                Dive into diverse disciplines, from engineering to social
                sciences, with our AI&apos;s specialized research paper
                guidance.
              </p>
            </div>
            <Spacer y='72' className='hidden sm:block' />
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
              >
                <path
                  opacity='0.986784'
                  d='M22.6628 2.60449C22.3094 2.60449 21.9548 2.72983 21.7041 2.97917C19.7041 4.97917 19.7041 4.97917 19.0374 5.64583L9.7041 14.9792C9.45477 15.2298 9.32943 15.5845 9.32943 15.9378V21.2712C9.32943 22.0072 9.92676 22.6045 10.6628 22.6045C11.3294 22.6045 15.3294 22.6045 15.9961 22.6045C16.3494 22.6045 16.7041 22.4792 16.9548 22.2298L26.2881 12.8965C26.9548 12.2298 26.9548 12.2298 28.9548 10.2298C29.2041 9.97915 29.3294 9.62449 29.3294 9.27116C29.3294 7.08983 28.7734 5.53117 27.6214 4.35384C26.4574 3.16717 24.9041 2.60449 22.6628 2.60449ZM9.32943 3.93783C6.38409 3.93783 3.99609 6.32583 3.99609 9.27116V22.6045C3.99609 25.5498 6.38409 27.9378 9.32943 27.9378H22.6628C25.6081 27.9378 27.9961 25.5498 27.9961 22.6045V17.2712C27.9961 16.5352 27.3988 15.9378 26.6628 15.9378C25.9268 15.9378 25.3294 16.5352 25.3294 17.2712V22.6045C25.3294 24.0778 24.1361 25.2712 22.6628 25.2712H9.32943C7.85609 25.2712 6.66276 24.0778 6.66276 22.6045V9.27116C6.66276 7.79783 7.85609 6.60449 9.32943 6.60449H14.6628C15.3988 6.60449 15.9961 6.00716 15.9961 5.27116C15.9961 4.53516 15.3988 3.93783 14.6628 3.93783H9.32943ZM23.2054 5.29647C24.4081 5.36713 25.1694 5.64181 25.7041 6.18848C26.2508 6.74581 26.5654 7.58717 26.6388 8.76717C25.9868 9.41917 25.5828 9.80584 25.3348 10.0552C24.2774 8.99918 22.9361 7.6698 21.8801 6.61247C22.1294 6.36313 22.5534 5.94847 23.2054 5.29647ZM19.9988 8.50586L23.4454 11.9432L15.4121 19.9378C14.5694 19.9378 13.2241 19.9378 11.9961 19.9378V16.5218L19.9988 8.50586Z'
                  fill='#8551F3'
                />
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='text-center text-[16px] font-[600] sm:text-[20px]'>
                Essays
              </h5>
              <p className='small-regular text-center text-[#64626A] sm:w-full sm:text-[18px]'>
                Elevate your essays: our AI pinpoints and perfects your thesis
                for impactful arguments
              </p>
            </div>
          </div>
          <div className='flex w-full flex-col items-center gap-y-2 sm:h-[368px] sm:w-1/2'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
              >
                <path
                  d='M9.32942 3.9873C6.38409 3.9873 3.99609 6.37517 3.99609 9.32064V22.654C3.99609 25.5994 6.38409 27.9873 9.32942 27.9873H22.6628C25.6081 27.9873 27.9961 25.5994 27.9961 22.654V9.32064C27.9961 6.37517 25.6081 3.9873 22.6628 3.9873H9.32942ZM9.32942 6.65397H22.6628C24.1361 6.65397 25.3294 7.84784 25.3294 9.32064V22.654C25.3294 24.1268 24.1361 25.3206 22.6628 25.3206H9.32942C7.85609 25.3206 6.66276 24.1268 6.66276 22.654V9.32064C6.66276 7.84784 7.85609 6.65397 9.32942 6.65397ZM10.6628 9.32064C9.92676 9.32064 9.32942 9.91757 9.32942 10.654C9.32942 11.3904 9.92676 11.9873 10.6628 11.9873H21.3294C22.0654 11.9873 22.6628 11.3904 22.6628 10.654C22.6628 9.91757 22.0654 9.32064 21.3294 9.32064H10.6628ZM11.9961 14.654C11.2601 14.654 10.6628 15.2509 10.6628 15.9873C10.6628 16.7237 11.2601 17.3206 11.9961 17.3206H19.9961C20.7321 17.3206 21.3294 16.7237 21.3294 15.9873C21.3294 15.2509 20.7321 14.654 19.9961 14.654H11.9961ZM13.3294 19.9873C12.5934 19.9873 11.9961 20.5842 11.9961 21.3206C11.9961 22.057 12.5934 22.654 13.3294 22.654H18.6628C19.3988 22.654 19.9961 22.057 19.9961 21.3206C19.9961 20.5842 19.3988 19.9873 18.6628 19.9873H13.3294Z'
                  fill='#8551F3'
                />
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='text-center text-[16px] font-[600] sm:text-[20px]'>
                Build Outlines
              </h5>
              <p className='small-regular text-center text-[#64626A] sm:w-full sm:text-[18px]'>
                Transform your research topic into a structured academic paper
                effortlessly with our outlining tool
              </p>
            </div>
            <Spacer y='74' className='hidden sm:block' />
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
              >
                <path
                  d='M16.0169 2.66504C8.65293 2.66504 2.68359 8.63438 2.68359 15.9984C2.68359 17.481 3.00492 19.2384 3.47559 20.6237L3.05827 22.3317C1.93427 26.8277 5.09293 30.0837 9.60093 28.957L11.4329 28.4984C12.8663 28.9984 14.5303 29.3317 16.0169 29.3317C23.3809 29.3317 29.3503 23.3624 29.3503 15.9984C29.3503 8.63438 23.3809 2.66504 16.0169 2.66504ZM16.0169 5.33171C21.9076 5.33171 26.6836 10.1077 26.6836 15.9984C26.6836 21.8891 21.9076 26.6651 16.0169 26.6651C14.6929 26.6651 13.2876 26.3744 12.0169 25.8731C11.7596 25.7717 11.4943 25.7651 11.2249 25.8317L8.97559 26.3731C6.43425 27.0091 4.99692 25.5771 5.64225 22.9984L6.14225 20.7904C6.20359 20.5264 6.19959 20.2504 6.09959 19.9984C5.61426 18.765 5.35026 17.3584 5.35026 15.9984C5.35026 10.1077 10.1263 5.33171 16.0169 5.33171ZM10.6836 14.665C9.94759 14.665 9.35026 15.2624 9.35026 15.9984C9.35026 16.7344 9.94759 17.3317 10.6836 17.3317C11.4196 17.3317 12.0169 16.7344 12.0169 15.9984C12.0169 15.2624 11.4196 14.665 10.6836 14.665ZM16.0169 14.665C15.2809 14.665 14.6836 15.2624 14.6836 15.9984C14.6836 16.7344 15.2809 17.3317 16.0169 17.3317C16.7529 17.3317 17.3503 16.7344 17.3503 15.9984C17.3503 15.2624 16.7529 14.665 16.0169 14.665ZM21.3503 14.665C20.6143 14.665 20.0169 15.2624 20.0169 15.9984C20.0169 16.7344 20.6143 17.3317 21.3503 17.3317C22.0863 17.3317 22.6836 16.7344 22.6836 15.9984C22.6836 15.2624 22.0863 14.665 21.3503 14.665Z'
                  fill='#8551F3'
                />
              </svg>
            </div>
            <div className='py-1'>
              <h5 className='text-center text-[16px] font-[600] sm:text-[20px]'>
                Literature Reviews
              </h5>
              <p className='small-regular text-center text-[#64626A] sm:w-full sm:text-[18px]'>
                Access over 200 million papers for your literature reviews,
                ensuring depth and diversity in your citations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShowCase;
