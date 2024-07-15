import Spacer from '@/components/root/Spacer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
const DiscountModal = dynamic(
  () => import('@/components/editor/modal/Discount')
);

const WelcomeModalCN = dynamic(
  () => import('@/components/editor/modal/WelcomeCN')
);

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  unstable_setRequestLocale(params.lang);
  const t = (await getDictionary(params.lang)).Editor;
  const isInChina = params.lang === 'cn';

  return (
    <main className='relative flex h-full min-h-screen w-full flex-col items-center overflow-y-auto'>
      {isInChina ? <WelcomeModalCN /> : null}
      <DiscountModal />
      <Spacer y='75' />
    </main>
  );
}
