'use client';
import { WelcomEducationOptions, WelcomLanguageOptions } from '@/constant';
import { setEduInfo, setLanguageInfo } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Spacer from '../root/Spacer';

const Options = ({ type }: { type?: 'language' | 'education' }) => {
  const router = useRouter();
  const { mutateAsync: handleSetLanguage } = useMutation({
    mutationFn: (params: { language_background: string }) =>
      setLanguageInfo(params),
    onSuccess: () => {
      // router.push('/writtingpal/polish');
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
  const { mutateAsync: handleSetEducation } = useMutation({
    mutationFn: (params: { educational_background: string }) =>
      setEduInfo(params),
    onSuccess: () => {
      router.push('/welcome/language');
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  const handler = async (label: string) => {
    if (type === 'language') {
      await handleSetLanguage({ language_background: label });
    } else {
      await handleSetEducation({ educational_background: label });
    }
  };

  return (
    <div className='flex flex-col'>
      {type === 'language' ? (
        <>
          <h1 className='text-center text-[42px] font-[500] text-[#17161B]'>
            Welcome to ProDream
          </h1>
          <Spacer y='20' />
          <p className='base-regular max-w-[1000px] text-center font-[400] text-[#525252]'>
            Could you share if English is your native language or if you&apos;re
            studying in English as a second language? Your response will help us
            ensure our services best fit your linguistic background and learning
            needs
          </p>
          <Spacer y='50' />
          <div className='flex w-full justify-center gap-x-10'>
            {WelcomLanguageOptions.map((item, index) => (
              <div
                key={item.name}
                onClick={() => handler(item.label)}
                className='flex h-[420] w-[440px] cursor-pointer flex-col items-center rounded-[22px] border border-shadow-border px-[20px] py-[36px] hover:bg-[#F8F9FC]'
              >
                <h5 className='title-semibold text-center'>{item.name}</h5>
                <Spacer y='37' />
                <Image
                  src={item.src}
                  alt='welcome'
                  width={250}
                  height={250}
                  className='h-[250px] w-[250px]'
                  priority
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className='text-center text-[42px] font-[500] text-[#17161B]'>
            Welcome to ProDream
          </h1>
          <Spacer y='20' />
          <p className='base-regular text-center font-[400] text-[#525252]'>
            Which of the following best describes your current educational or
            professional stage:
          </p>
          <Spacer y='50' />
          <div className='flex w-full justify-center gap-x-10'>
            {WelcomEducationOptions.map((item, index) => (
              <div
                key={item.name}
                onClick={() => handler(item.label)}
                className='flex h-[420px] w-[380px] cursor-pointer flex-col items-center rounded-[22px] border border-shadow-border px-[20px] py-[36px] hover:bg-[#F8F9FC]'
              >
                <h5 className='title-semibold text-center'>{item.name}</h5>
                <Spacer y='37' />
                <div className='relative flex w-full flex-1 overflow-hidden'>
                  <Image
                    src={item.src}
                    alt='welcome'
                    sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                    fill
                    className=' object-contain'
                  />
                </div>
                <Spacer y='37' />
                <p className='base-regular text-center text-doc-font'>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Options;
