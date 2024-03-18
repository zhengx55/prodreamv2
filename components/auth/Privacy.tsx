import { Locale } from '@/i18n-config';
import Link from 'next/link';
import { memo } from 'react';

const Privacy = ({ lang }: { lang: Locale }) => {
  return lang === 'cn' ? (
    <p className='subtle-regular md:small-regular mb-10 mt-auto w-full cursor-pointer text-neutral-400 md:mb-0 md:mt-10 md:w-[500px]'>
      注册登录即代表同意&nbsp;
      <Link
        target='_blank'
        href={
          'https://applifyai.notion.site/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e?pvs=4'
        }
        className='text-auth-primary'
      >
        《ProDream用户协议》
      </Link>
      <Link
        target='_blank'
        href={
          'https://applifyai.notion.site/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
        }
        className='text-auth-primary'
      >
        《ProDream隐私政策》
      </Link>
    </p>
  ) : (
    <p className='subtle-regular md:small-regular mb-10 mt-auto w-full cursor-pointer text-neutral-400 md:mb-0 md:mt-10 md:w-[500px]'>
      By Continuing, you agree to&nbsp;Applify AI&apos;s&nbsp;
      <Link
        target='_blank'
        href={
          'https://applifyai.notion.site/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e?pvs=4'
        }
        className='text-auth-primary'
      >
        Term of Service
      </Link>
      &nbsp; and
      <Link
        target='_blank'
        href={
          'https://applifyai.notion.site/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
        }
        className='text-auth-primary'
      >
        &nbsp;Privacy Policy
      </Link>
    </p>
  );
};

export default memo(Privacy);
