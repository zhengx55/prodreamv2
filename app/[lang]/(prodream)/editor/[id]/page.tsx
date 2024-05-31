import EssayPanel from '@/components/editor/EssayPanel';
import { Locale } from '@/i18n-config';
import { getTranslations } from 'next-intl/server';
import { getDictionary } from '@/lib/get-dictionary';


export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string; lang: Locale };
  searchParams: { new: string };
}) {
  const dict = (await getDictionary(params.lang)).Editor;

  const trans = await getTranslations("Homepage");

  return (
    <EssayPanel
      isNew={searchParams.new === 'true' ? true : false}
      id={params.id}
      lang={params.lang}
      t={dict}
    />
  );
}
