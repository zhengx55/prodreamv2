import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { memo } from 'react';

const Privacy = () => {
  const t = useTranslations('Auth');

  return (
    <p className='subtle-regular md:small-regular mb-10 mt-auto w-full cursor-pointer text-neutral-400 md:mb-0 md:mt-10 md:w-[500px]'>
      {t('Privacy.By_Continuing_you_agree_to_Applify_AI_s')}&nbsp;
      <Link
        target='_blank'
        href={
          'https://applifyai.notion.site/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e?pvs=4'
        }
        className='text-violet-500'
      >
        {t('Privacy.Terms_of_Service')}
      </Link>
      <Link
        target='_blank'
        href={
          'https://applifyai.notion.site/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
        }
        className='text-violet-500'
      >
        {t('Privacy.Privacy_Policy')}
      </Link>
    </p>
  ) 
};

export default memo(Privacy);
