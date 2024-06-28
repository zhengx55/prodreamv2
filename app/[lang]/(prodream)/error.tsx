'use client';
import { useTranslations } from 'next-intl';

export default function Error({ reset }: { reset: () => void }) {
  const transError = useTranslations('Error');

  return (
    <div>
      <h2>{transError('Something_went_wrong')}</h2>
      <button onClick={() => reset()}>{transError('Try_again')}</button>
    </div>
  );
}
