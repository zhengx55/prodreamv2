'use client';

import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Spacer from '../root/Spacer';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { setOnboardNameAndCode } from './_action';

type Props = {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  name?: string;
  lang: Locale;
};
const InfoForm = ({ dict, name, lang }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const t = useTranslations('Onboard');

  async function updateInfo(formData: FormData) {
    const result = await setOnboardNameAndCode(formData, lang);
    if (result.error) {
      setErrorMessage(result.error);
      return;
    }
  }
  return (
    <form action={updateInfo} className='flex w-full flex-col sm:w-[500px] '>
      <Input
        id='name'
        required
        defaultValue={name ?? ''}
        name='first_name'
        aria-placeholder='name'
        className='base-regular sm:title-regular h-14'
        placeholder={t('FormName')}
      />
      <Spacer y='20' />
      <Input
        id='code'
        name='code'
        aria-placeholder='code'
        className={`base-regular sm:title-regular h-14 ${errorMessage ? ' border-red-400 bg-red-50' : ''}`}
        placeholder={t('FormCode')}
      />
      <div className='flex w-full justify-end'>
        <p className='small-medium text-red-400'>{errorMessage}</p>
      </div>
      <Spacer y='10' />
      <p className='subtle-regular text-neutral-400'>{t('Option')}</p>
      <Spacer y='80' />
      <SubmitBtn label={t('Button')} />
    </form>
  );
};

const SubmitBtn = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      role='button'
      type='submit'
      className='small-medium sm:title-medium h-max w-full rounded-lg py-2 sm:py-4'
    >
      {pending && <Loader2 className='animate-spin' size={22} />}
      {label}
    </Button>
  );
};

export default InfoForm;
