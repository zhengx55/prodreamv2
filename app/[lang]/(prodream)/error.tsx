'use client';
import { useTranslations } from 'next-intl';

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('Error');
  return (
    <div>
      <h2>{t('Something_went_wrong')}</h2>
      <button onClick={() => reset()}>{t('Try_again')}</button>
    </div>
  );
}
